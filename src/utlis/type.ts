type EnumMapping<T extends string | number | symbol, U extends string | number | symbol> = {
    [key in T]: U;
};

export function getEnumValue<T extends string | number | symbol, U extends string | number | symbol>(input: T, mapping: EnumMapping<T, U>): U {
    if (mapping[input] !== undefined) {
        return mapping[input];
    } else {
        throw new Error("Invalid input");
    }
}