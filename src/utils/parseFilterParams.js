const parseType = (type) => {
    const isString = typeof type === 'string';
    if(!isString) return;
    const isValidType = ['work', 'home', 'personal'].includes(type);
    if(isValidType) return type;
};

const parseFavourite = (isFavourite) => {
    const isBoolean = typeof isFavourite === 'boolean';
    if(!isBoolean) return;
    return isFavourite;
};

export const parseFilters = (query) => {
    const {contactType, isFavourite} = query;

    const parsedContactType = parseType(contactType);
    const parsedIsFavourite = parseFavourite(isFavourite);

    return {
        contactType: parsedContactType,
        isFavourite: parsedIsFavourite,
    };
};
