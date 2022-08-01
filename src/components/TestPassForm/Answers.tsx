import { FormGroup, RadioGroup } from "@mui/material";
import { FC } from "react";
import { IAnswer } from "../../models/IAnswer";
import { QuestionTypes } from "../../types/QuestionTypes";
import { CheckboxAnswer } from "./CheckboxAnswer";
import { InputAnswer } from "./InputAnswer";
import { RadioAnswer } from "./RadioAnswer";

interface AnswersProps {
  questionType: QuestionTypes;
  answers: IAnswer[];
}

export const Answers: FC<AnswersProps> = ({ answers, questionType }) => {
  if (questionType === QuestionTypes.CHECKBOX) {
    return (
      <FormGroup onChange={(event) => console.log(event)}>
        {answers.map((item) => (
          <CheckboxAnswer key={item.id} answer={item} />
        ))}
      </FormGroup>
    );
  } else if (questionType === QuestionTypes.RADIO) {

    return (
      <RadioGroup
      >
        {answers.map((item) => (
          <RadioAnswer key={item.id} answer={item} />
        ))}
      </RadioGroup>
    );
  } else {
    return <InputAnswer answer={answers[0]} />;
  }
};
