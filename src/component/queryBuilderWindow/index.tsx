import { useEffect, useRef, useState } from "react";
import type { RuleGroupType } from "react-querybuilder";
import { QueryBuilder, formatQuery } from "react-querybuilder";
import { QueryBuilderMaterial } from "@react-querybuilder/material";
import { parseCEL } from "react-querybuilder/parseCEL";
import "react-querybuilder/dist/query-builder.scss";
import "./queryBuilderWindow.scss";
import Button from "@mui/material/Button";
import CustomFieldSelector from "../customComponent/fieldSelector";
import {
  generateDisplayValue,
  generateSubElements,
  generateparseValue,
} from "../../Utils/helper";

const initialQuery: RuleGroupType = { combinator: "and", rules: [] };

function QueryBuilderWindow({ fields }: any) {
  const [query, setQuery] = useState(initialQuery);
  const [formattedQuery, setFormattedQuery] = useState("");
  const [objfields, setObjfields] = useState(generateSubElements(fields));
  const ref: any = useRef(null);

  useEffect(() => {
    const cel: string = formatQuery(query, {
      format: "cel",
      parseNumbers: true,
    });
    setFormattedQuery(cel);
  }, [query]);

  useEffect(() => {
    setObjfields(generateSubElements(fields));
  }, [JSON.stringify(fields)]);

  const loadRule = () => {
    const data: string = ref.current.value;
    const genString: string = generateparseValue(objfields, data);
    const parsedQuery = parseCEL(genString);
    setQuery(parsedQuery);
  };

  return (
    <>
      <QueryBuilderMaterial>
        {objfields && (
          <QueryBuilder
            fields={objfields}
            query={query}
            onQueryChange={setQuery}
            controlElements={{
              fieldSelector: CustomFieldSelector,
            }}
          />
        )}
      </QueryBuilderMaterial>

      <div style={{ marginTop: "20px" }}>
        <textarea
          style={{ width: "100%" }}
          rows={10}
          value={generateDisplayValue(objfields, formattedQuery)}
        ></textarea>
      </div>
      <div style={{ marginTop: "20px" }}>
        <textarea ref={ref} style={{ width: "100%" }} rows={10}></textarea>
      </div>
      <Button
        variant="contained"
        size="small"
        className="load-rule"
        onClick={loadRule}
      >
        Load Rule
      </Button>
    </>
  );
}

export default QueryBuilderWindow;
