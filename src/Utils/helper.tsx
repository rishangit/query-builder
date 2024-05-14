import type { CustomField } from "./types";

export const complexPrfix = "_____";

export const generateSubElements = (fields: CustomField[]) => {
  const subList = fields
    .filter((field: CustomField) => field.subValues)
    .map((field: CustomField) => {
      return field.subValues?.map((sub: any) => ({
        name: generateSubElementsValue(field.name, sub.name),
        label: generateSubElementsValue(field.name, sub.name),
        displayLabel: generateSubElementsDisplayValue(field.name, sub.name),
        groupNumber: "hidden",
        inputType: field.inputType,
      }));
    });
  let newfields: any[] = [...fields, ...subList.flat(Infinity)];
  return newfields;
};

export const generateSubElementsValue = (
  mainValue: string,
  subValue: string
): string => {
  return `${mainValue}${complexPrfix}${subValue}${complexPrfix}`;
};

export const generateSubElementsDisplayValue = (
  mainValue: string,
  subValue: string
): string => {
  return Number.isFinite(subValue)
    ? `${mainValue}(${subValue})`
    : `${mainValue}("${subValue}")`;
};

export const generateDisplayValue = (
  fields: CustomField[],
  queryString: string
): string => {
  let modifiedString = queryString;
  fields.forEach((element: CustomField) => {
    if (element?.groupNumber === "hidden") {
      modifiedString = modifiedString.replaceAll(
        element.name,
        element.displayLabel
      );
    }
  });
  return modifiedString;
};

export const generateparseValue = (
  fields: CustomField[],
  queryString: string
): string => {
  let modifiedString = queryString;
  fields.forEach((element: CustomField) => {
    if (element?.groupNumber === "hidden") {
      modifiedString = modifiedString.replaceAll(
        element.displayLabel,
        element.name
      );
    }
  });
  return modifiedString;
};

export const getSelectedValue = (
  options: { name: string; label: string }[],
  rule: any
) => {
  const fieldIndex: any = options.findIndex(
    (item: any) => item.name === rule.field
  );
  let main,
    sub = {};
  if (fieldIndex > -1) {
    const selected: any = options[fieldIndex];
    if (selected.groupNumber === "hidden") {
      const items = selected.name.split(complexPrfix);
      const selectedMain: any = options.find(
        (item: any) => item.name === items[0]
      );

      main = { ...selectedMain };
      sub = { ...selected, name: items[1] };
    } else {
      main = selected;
    }
  }
  return { main, sub };
};
