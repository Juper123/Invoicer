export const hasValue = (value: string): boolean => {
    return value !== '' && value !== null && value !== undefined
}

export const getDateString = (date: string): string => {
    return [date.slice(0, 2), '.', date.slice(2, 4), '.', date.slice(4)].join('');
}

export const parseDate = (date: string): string => {
    const parseDate = date.split('-');
    const parsedDate = `${parseDate[2]}/${parseDate[1]}/${parseDate[0]}`
    return parsedDate
}