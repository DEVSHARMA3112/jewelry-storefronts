// Newsletter sign-up. jsonplaceholder is a free fake API that accepts any POST.
export async function subscribe(email) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error('Could not subscribe');
  return response.json();
}
