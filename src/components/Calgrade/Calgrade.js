import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Axios from "axios";
function CalGrade() {
  const [average, setAverage] = useState(0);
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const onCalculate = (values) => {
    if (values.items) {
      Axios.post("http://localhost:8888/calculate", values.items).then(
        (res) => {
          setAverage(res.data.average);
          console.log(res);
        }
      );
    }
  };
  return (
    <>
      <div className="container text-center">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => append({})}
        >
          Add
        </button>
        <div className="row">
          <form onSubmit={handleSubmit(onCalculate)}>
            {fields.map(({ id, subject, grade, unit }, index) => {
              return (
                <div key={id}>
                  <input
                    ref={register()}
                    name={`items[${index}].subject`}
                    defaultValue={subject}
                    placeholder="Subject (Optional)"
                  />
                  <select
                    ref={register({ required: "Required" })}
                    name={`items[${index}].grade`}
                    defaultValue={grade}
                    placeholder="Grade"
                  >
                    <option value="">Select Grade</option>
                    <option value="4">4 (A)</option>
                    <option value="3.5">3.5 (B+)</option>
                    <option value="3">3(B)</option>
                    <option value="2.5">2.5 (C+)</option>
                    <option value="2">2 (C)</option>
                    <option value="1.5">1.5 (D+)</option>
                    <option value="1">1 (D)</option>
                    <option value="0">0 (F)</option>
                  </select>
                  <input
                    ref={register({ required: "Required" })}
                    type="number"
                    name={`items[${index}].unit`}
                    defaultValue={unit}
                    placeholder="unit"
                    min="1"
                    max="100"
                    step="0.5"
                  />

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}

            <button type="submit" className="btn btn-primary">
              Calculate
            </button>
          </form>
        </div>
      </div>
      <h1 className="text-center text-success">Average : {average}</h1>
    </>
  );
}

export default CalGrade;
