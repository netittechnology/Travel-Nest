import { Transform } from 'class-transformer';

export function ToNumberArray() {
    return Transform(({ value }) => {
        if (value === undefined || value === null) return value;

        const raw = Array.isArray(value) ? value : String(value).split(',');
        return raw.map((v) => Number(v));
    });
}