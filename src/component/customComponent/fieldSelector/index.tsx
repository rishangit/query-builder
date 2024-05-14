import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { FieldSelectorProps } from "react-querybuilder";
import {
  generateSubElementsValue,
  getSelectedValue,
} from "../../../Utils/helper";

const enum Level {
  Main,
  Sub,
}

function CustomFieldSelector({ options, handleOnChange, rule }: any) {
  const values = getSelectedValue(options, rule);
  const [selectedMain, setSelectedMain] = useState<any>(values.main);
  const [selectedSub, setSelectedSub] = useState<any>(values.sub);
  const [subElements, setSubElements] = useState(selectedMain.subValues);

  useEffect(() => {
    setSubElements(selectedMain.subValues);
  }, [JSON.stringify(selectedMain)]);

  useEffect(()=>{
    console.log('selectedSub', selectedSub)
  },[JSON.stringify(selectedSub)])

  // useEffect(() => {

  //   console.log('selectedMain', selectedMain, 'selectedSub', selectedSub, 'subElements', subElements)
  //   if (selectedMain && Object.keys(selectedSub).length === 0 && subElements ){
  //     console.log('subElements[0]', subElements[0])
  //     setSelectedSub(subElements[0]);
  //   }
  // }, [JSON.stringify(selectedMain), JSON.stringify(subElements)]);

  const handleChange = (e: any, level: Level) => {
    if (level === Level.Main) {
      const fieldIndex: number = options?.findIndex(
        (item: any) => item.name === e.target.value
      );
      if (fieldIndex > -1) {
        setSelectedMain(options[fieldIndex]);
      }
      handleOnChange(`${e.target.value}`);
    } else {
      handleOnChange(
        generateSubElementsValue(selectedMain?.name, e.target.value)
      );
    }
  };

  const drawDrop = useCallback(
    (level: Level, listOptions: any[] = [], selected: { name: string }) => {
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          value={selected.name}
          onChange={(e) => handleChange(e, level)}
          style={{ width: "100%" }}
          variant={"standard"}
          displayEmpty={false}
        >
          {listOptions
            .filter((item: any) => item.groupNumber !== "hidden")
            .map((item: any, index: number) => (
              <MenuItem key={index} value={item.name}>
                {item.label}
              </MenuItem>
            ))}
        </Select>
      );
    },
    [
      JSON.stringify(selectedMain),
      JSON.stringify(selectedSub),
      JSON.stringify(subElements),
    ]
  );

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>{drawDrop(Level.Main, options, selectedMain)}</div>
      {subElements && subElements.length > 0 && (
        <div>{drawDrop(Level.Sub, subElements, selectedSub)}</div>
      )}
    </div>
  );
}

export default CustomFieldSelector;
