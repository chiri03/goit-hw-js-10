export function fetchCatByBreed(breedId) {
  const API_KEY =
    'live_ERwia957CD7C5M4P2jR8Lz3FoJBn4m9Vn2x6u6Xf7g5uihzCuJ84GQ0x3oJWqErX';
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`,
    {
      headers: {
        'x-api-key': API_KEY,
      },
    }
  ).then(response => {
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return response.json();
  });
}
