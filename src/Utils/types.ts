import type { Field, RuleType } from 'react-querybuilder';


export type CustomField = Field & {
    subValues?: any[];
    displayLabel: string
}