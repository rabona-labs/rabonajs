import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});

const openaiClient = new OpenAIApi(configuration);

try {
  const completions = await openaiClient.createCompletion({
    model: 'text-davinci-003',
    prompt: '${{ toJson(steps.git-diff.outputs.stdout) }}',
    max_tokens: 256,
    n: 1,
  });

  console.log(completions.data.choices[0].text);
} catch (error) {
  console.error(error);
}
