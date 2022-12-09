import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});

const openaiClient = new OpenAIApi(configuration);

const completions = await openaiClient.createCompletion({
  model: 'gpt-3',
  prompt:
    'Please review the code changes in this pull request and provide comments on any potential errors or problems you see',
  max_tokens: 256,
  n: 1,
});

// Generate text using the GPT-3 model
completions().then((response) => {
  // Print the generated text
  console.log(JSON.stringify(response));
});
