import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from '@langchain/core/prompts'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    summary: z
      .string()
      .describe('quick summary of the entire entry.'),
    subject: z
      .string()
      .describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe('is the journal entry negative? (i.e. does it contain negative emotions?).'),
    color: z
      .string()
      .describe('a hexidecimal color code that represents the mood of the entry. Example #5ce65c for green representing happiness.'),

  })
)

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template: 'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! {format_instructions} {entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  console.log(input)
  return input
}

export const analyze = async (content) => {
  const input = await getPrompt(content)
  const model = new ChatOpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'})
  const result = await model.invoke(input)

  console.log(result)
}