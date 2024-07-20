const parseType = (type) => {
    const isString = typeof type === 'string';
    if(!isString) return;
    const isValidType = ['work', 'home', 'personal'].includes(type);
    if(isValidType) return type;
};

const parseFavourite = (isFavourite) => {
    const isString = typeof isFavourite === 'string';
    if(!isString) return;
    const isValidDoolean = ['true', 'false'].includes(isFavourite);
    if(!isValidDoolean) return;
    return isFavourite;
};

const parseName = (name) => {
    const isString = typeof name === 'string';
    if(!isString) return;
    return name;
};

export const parseFilters = (query) => {
    const {contactType, isFavourite, name} = query;

    const parsedContactType = parseType(contactType);
    const parsedIsFavourite = parseFavourite(isFavourite);
    const parsedName = parseName(name);

    return {
        contactType: parsedContactType,
        isFavourite: parsedIsFavourite,
        name: parsedName,
    };
};
