import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});

const openaiClient = new OpenAIApi(configuration);

try {
  const completions = await openaiClient.createCompletion({
    model: 'text-davinci-003',
    prompt:
      'Send me suggestions for these changes in a PR ${{ toJson(steps.git-diff.outputs.stdout) }}',
    max_tokens: 256,
    n: 1,
  });

  console.log(completions.data.choices[0].text);
} catch (error) {
  console.error(error);
}
