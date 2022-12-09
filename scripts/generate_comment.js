import fetch from 'node-fetch';

async function generateText(prompt, accessToken) {
  // Set up the request body
  const body = {
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 1024,
    top_p: 1.0,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  // Set up the request headers
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  // Send a POST request to the Generate Text endpoint of the OpenAI API
  const response = await fetch('https://api.openai.com/v1/text_generations', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: headers,
  });

  // Return the generated text
  return response.json();
}

// Generate text using the GPT-3 model
generateText(
  'Please review the code changes in this pull request and provide comments on any potential errors or problems you see',
  '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',
).then((response) => {
  // Print the generated text
  console.log(response.data.choices[0].text);
});
