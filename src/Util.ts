
const offsetExtn = "T00:00:00Z"

const MIN_DATE = "1971-01-01";
const MAX_DATE= "2999-12-31";
const MIN_DATETIMEOFFSET = "1971-01-01T00:00:00Z";
const MAX_DATETIMEOFFSET = "2999-12-31T00:00:00Z";

const convertDateTimeToOffsetDateTime = (dateTimeText: string | undefined) => {
    return (dateTimeText || MIN_DATE) + offsetExtn;
}

const convertOffsetDateTimeToDateTime = (offsetDateTime: string) => {
    return (offsetDateTime || MIN_DATETIMEOFFSET).substring(0, offsetDateTime.length - offsetExtn.length);
}

export const UTIL = {
    convertToOffsetDateTime: convertDateTimeToOffsetDateTime,
    convertToDateTime: convertOffsetDateTimeToDateTime,
}