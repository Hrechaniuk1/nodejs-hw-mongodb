
const parseNumber = (number, defaultNumber) => {
    const isString = typeof number === 'string';
    if(!isString) return defaultNumber;

    const parsedNumber = parseInt(number);
    if(Number.isNaN(parsedNumber)) return defaultNumber;
    return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const {page, perPage} = query;

  const parsedPage = parseNumber(page);
  const parsedPerPage = parseNumber(perPage);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
