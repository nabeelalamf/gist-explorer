export const config = {
  baseUrl: 'https://api.github.com'
};

export function getUserGistsUrl(user, page, perPage) {
  return `${config.baseUrl}/users/${user}/gists?page=${page}&perPage=${perPage}`;
}