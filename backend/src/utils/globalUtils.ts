export const removeDuplicateValuesFromArray = <T> (array: Array<T>) => {
    const removeDuplicate = new Set([...array]);

    return Array.from(removeDuplicate);
} 
