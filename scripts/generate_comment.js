import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});

const openaiClient = new OpenAIApi(configuration);

try {
  const diffOutput = '${{ toJson(steps.git-diff.outputs.stdout) }}';
  const changes = diffOutput.split('\n').join(' ');

  const completions = await openaiClient.createCompletion({
    model: 'text-davinci-003',
    prompt: changes,
    max_tokens: 256,
    n: 1,
  });

  console.log(completions.data.choices[0].text);
} catch (error) {
  console.error(error);
}
