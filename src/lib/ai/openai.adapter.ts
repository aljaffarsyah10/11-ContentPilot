import OpenAI from "openai";
import { AIProvider, CaptionGenerationResult } from "./ai-provider.interface";
import { GenerateCaptionDto } from "@/lib/validation/ai.schema";
import { AIProviderError } from "@/lib/error/api-error";
import { z } from "zod";

const aiOutputSchema = z.object({
  captions: z.array(
    z.object({
      caption: z.string(),
      hashtags: z.array(z.string()),
      callToAction: z.string(),
    })
  ),
});

export class OpenAIAdapter implements AIProvider {
  private client: OpenAI | null = null;
  private model: string;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    this.model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    if (apiKey && apiKey.trim() !== "") {
      this.client = new OpenAI({ apiKey });
    }
  }

  async generateCaptions(input: GenerateCaptionDto): Promise<CaptionGenerationResult> {
    if (!this.client) {
      throw new AIProviderError(
        "Kunci OPENAI_API_KEY belum dikonfigurasi di server. Silakan tambahkan pada file konfigurasi environment."
      );
    }

    const systemPrompt = `Anda adalah Senior Social Media Copywriter profesional.
Tugas Anda adalah membuat 3 variasi caption media sosial yang menarik, ber-hook tajam, dan siap tayang.
Format output WAJIB berupa JSON murni dengan struktur:
{
  "captions": [
    {
      "caption": "Teks naskah caption lengkap dengan spacing dan emoji yang rapi",
      "hashtags": ["tag1", "tag2", "tag3"],
      "callToAction": "Kalimat ajakan interaksi (CTA)"
    }
  ]
}`;

    const userPrompt = `Detail Permintaan:
- Topik: ${input.topic}
- Platform: ${input.platform}
- Gaya Bahasa (Tone): ${input.tone}
- Bahasa: ${input.language === "indonesian" ? "Bahasa Indonesia" : "English"}
- Panjang Caption: ${input.length}
${input.audience ? `- Target Audiens: ${input.audience}` : ""}
${input.additionalInstructions ? `- Instruksi Tambahan: ${input.additionalInstructions}` : ""}`;

    try {
      // Abort controller with 25s timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const response = await this.client.chat.completions.create(
        {
          model: this.model,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.8,
          max_tokens: 1500,
        },
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new AIProviderError("AI tidak memberikan respon konten");
      }

      const parsedJson = JSON.parse(content);
      const validated = aiOutputSchema.parse(parsedJson);

      return {
        captions: validated.captions.map((item, idx) => ({
          id: `var-${idx + 1}-${Date.now()}`,
          caption: item.caption,
          hashtags: item.hashtags.map((h) => h.replace(/^#/, "")),
          callToAction: item.callToAction,
        })),
        usage: {
          totalTokens: response.usage?.total_tokens || 0,
          promptTokens: response.usage?.prompt_tokens || 0,
          completionTokens: response.usage?.completion_tokens || 0,
        },
      };
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        throw new AIProviderError("Format output yang dihasilkan AI tidak valid", error.issues);
      }
      if (error instanceof Error && error.name === "AbortError") {
        throw new AIProviderError("Permintaan ke OpenAI memakan waktu terlalu lama (Timeout > 25 detik)");
      }
      if (error instanceof Error) {
        throw new AIProviderError(error.message);
      }
      throw new AIProviderError("Terjadi kegagalan komunikasi dengan provider AI");
    }
  }
}

export const aiProvider = new OpenAIAdapter();

