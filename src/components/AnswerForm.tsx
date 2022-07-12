import { FormControlLabel, RadioGroup, Radio, FormGroup, Checkbox, Input } from "@mui/material";
import { FC } from "react";
import { Types } from "../types/QuestionTypes";

interface AnswerFormProps {
  type: Types;
  answers: string[];
}

export const AnswerForm: FC<AnswerFormProps> = ({ type, answers }) => {
  if (type === Types.CHECKBOX) {
    return (
      <FormGroup>
        {answers.map(item => {
            return <FormControlLabel control={<Checkbox />} label={item} />
        })}
        
      </FormGroup>
    );
  } else if (type === Types.RADIO) {
    return (
      <RadioGroup name="radio-buttons-group">
        {answers.map((item) => {
          return (
            <FormControlLabel value={item} control={<Radio />} label={item} />
          );
        })}
      </RadioGroup>
    );
  } else {
    return <Input/>;
  }
};
