"use client";
import React, { useEffect } from "react";
import TextField from "@/components/TextField.jsx";
import Dropdown from "@/components/DropdownNewCatagory.jsx";
import LightDarkToggle from "@/components/specific/LightDarkToggle.jsx";
import { useState } from "react";
import tempData from "@/app/data.json";
import Checkbox from "@/components/Checkbox";
import DropdownSelectCatagory from "@/components/DropdownSelectCatagory.jsx";
import { useSpring, animated } from "react-spring";
import DeleteButton from "@/components/specific/DeleteButton.jsx";
import EditButton from "@/components/specific/EditButton.jsx";

const Todo = () => {
  // Form States
  const [data, setData] = useState(tempData);
  const [selectedOption, setSelectedOption] = useState("All Categories");
  const [titleInputValue, setTitleInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");
  const [descriptionHasInteracted, setDescriptionHasInteracted] =
    useState(false);
  const [titleHasInteracted, setTitleHasInteracted] = useState(false);
  const [formValues, setFormValues] = useState({
    taskName: "",
    category: selectedOption,
    description: "",
  });

  // Delete Button States
  const [buttonY, setButtonY] = useState(-75);
  const [targetedTask, setTargetedTask] = useState(0);

  // Edit Button States
  const [isEditing, setIsEditing] = useState([-1, -1]);
  const [targetedTask2, setTargetedTask2] = useState(0);
  const [buttonY2, setButtonY2] = useState(-75);
  const [value0, setValue0] = useState("");
  const [value1, setValue1] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const filteredTasks = data.tasks.filter(
    (task) =>
      task.category === selectedCategory ||
      selectedCategory === "All Categories"
  );

  const onBlur = (e, target, option, index, index2) => {
    if (e.target.value !== "") {
      if (!data.categories.includes(e.target.value)) {
        if (index2 === 0) {
          data.tasks[index].name = e.target.value;
          setIsEditing([isEditing[0], 1]);
          setValue0(e.target.value);
        } else {
          data.tasks[index].category = e.target.value;
          data.categories.push(e.target.value);
          setIsEditing([-1, -1]);
          setValue1(e.target.value);
        }
      }
    }
  };

  const { y } = useSpring({
    y: buttonY,
    config: { tension: 300, friction: 12 },
  });
  const { y2 } = useSpring({
    y2: buttonY2,
    config: { tension: 300, friction: 12 },
  });

  return (
    <div className="flex flex-col items-center justify-start relative">
      <div className="flex flex-col items-center justify-start h-[100vh] absolute top-0">
        <div className="flex flex-col items-center w-[100%] justify-center h-[250px] px-[20px]">
          <div className="flex justify-between items-center w-[100%] max-w-[600px] mt-[50px]">
            <h1 className="font-bold text-[70px] mb-[13px] dark:text-white w-[405px]">
              To-Do App
            </h1>
            <LightDarkToggle className="mt-[5px] ml-[50px]" />
          </div>
          <div className="w-[100%] max-w-[600px] h-[1px] bg-medium-grey opacity-50 mt-[15px]" />
          <div className="mt-[15px] flex flex-col w-[100%] max-w-[600px] h-auto justify-start px-[5px]">
            <div className="flex flex-col h-[60px] w-[100%]">
              <div className="flex items-center h-[100px] justify-between">
                <TextField
                  className="w-[295px] h-[80.5px] mr-[10px]"
                  title="Task Name"
                  description={false}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  inputValue={titleInputValue}
                  setInputValue={setTitleInputValue}
                  hasInteracted={titleHasInteracted}
                  setHasInteracted={setTitleHasInteracted}
                >
                  e.g. Laundry
                </TextField>
                <Dropdown
                  data={data}
                  setData={setData}
                  title="Category"
                  formValues={formValues}
                  setFormValues={setFormValues}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              </div>
              <div className="flex items-center justify-left relative">
                <TextField
                  description={true}
                  title="Description"
                  setFormValues={setFormValues}
                  formValues={formValues}
                  inputValue={descriptionInputValue}
                  setInputValue={setDescriptionInputValue}
                  hasInteracted={descriptionHasInteracted}
                  setHasInteracted={setDescriptionHasInteracted}
                >
                  e.g. Fold and put away clothes.
                </TextField>
                <button
                  className="w-[100px] h-[50px] bg-main-purple text-white rounded-[4px] border-[1.5px] border-medium-grey font-medium text-[18px] absolute top-[60.5px] right-0"
                  onClick={() => {
                    formValues.category = selectedOption;
                    setSelectedOption("Uncategorized");
                    setTitleInputValue("");
                    setTitleHasInteracted(false);
                    setDescriptionInputValue("");
                    setDescriptionHasInteracted(false);
                    data.tasks.push({
                      name: formValues.taskName,
                      category: formValues.category,
                      description: formValues.description,
                    });
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative top-[500px] w-[600px] mb-[500px]">
        <div className="flex justify-between items-center h-[50px]">
          <h1 className="text-[40px] font-bold dark:text-white">Tasks</h1>
          <DropdownSelectCatagory
            options={data.categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div
          className={`grid grid-cols-custom grid-rows-${data.tasks.length} w-grid h-auto my-[25px]`}
          id="table"
        >
          <React.Fragment key={0}>
            <div
              className={`px-4 border-[0.75px] max-w-[380px] dark:text-white border-t-[1.5px] rounded-ss-[10px] ${
                filteredTasks.length === 0
                  ? "border-b-[1.5px] rounded-es-[10px]"
                  : ""
              } border-l-[1.5px] border-medium-grey  h-[75px] flex justify-start items-center font-bold text-[25px]`}
            >
              Task
            </div>
            <div
              className={`px-4 border-[0.75px] dark:text-white border-t-[1.5px]
                  ${
                    filteredTasks.length === 0 ? "border-b-[1.5px]" : ""
                  } border-medium-grey h-[75px] flex justify-start items-center font-bold text-[25px]`}
            >
              Category
            </div>
            <div
              className={`group px-4 border-[0.75px] border-t-[1.5px] rounded-se-[10px] ${
                filteredTasks.length === 0
                  ? "border-b-[1.5px] rounded-ee-[10px]"
                  : ""
              } border-r-[1.5px] border-medium-grey h-[75px] flex justify-center items-center relative font-bold text-[25px] dark:text-white`}
              id={0}
            >
              ?
            </div>
          </React.Fragment>
          {data.tasks.map((task, i) => {
            if (filteredTasks.includes(task)) {
              const isLast = task === filteredTasks[filteredTasks.length - 1];
              return (
                <React.Fragment key={i + 1}>
                  <div
                    className={`px-4 py-3 border-[0.75px] w-[380px] max-w-[380px] dark:text-white relative ${
                      isLast ? "border-b-[1.5px] rounded-es-[10px]" : ""
                    } border-l-[1.5px] border-medium-grey  h-[75px] flex justify-start items-center`}
                  >
                    {isEditing[0] !== i || isEditing[1] === 1 ? (
                      <div
                        className="hide-scrollbar overflow-y-scroll w-full h-auto max-h-[100%] flex"
                        id={"taskName-" + i}
                      >
                        {task.name}
                      </div>
                    ) : (
                      <div className="hide-scrollbar overflow-y-scroll w-full h-auto max-h-[100%] flex">
                        <input
                          className="w-[380px] h-[24px] focus:outline-0 bg-white bg-opacity-0 dark:text-white overflow-x-hidden text-left flex items-center"
                          id={"taskName-" + i}
                          value={value0}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          onFocus={(e) => {
                            setValue0(task.name);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === " ") {
                              e.preventDefault();
                              setValue0(value0 + " ");
                            }
                            if (e.key === "Enter") {
                              onBlur(e, e.target, data.tasks[i].name, i, 0);
                              e.target.blur();
                            }
                          }}
                          autoFocus
                          onChange={(e) => {
                            setValue0(e.target.value);
                          }}
                          onBlur={(e) => {
                            onBlur(e, e.target, data.tasks[i].name, i, 0);
                          }}
                        />
                      </div>
                    )}
                    <button
                      className="w-[10px] h-[40px] rounded-full rounded-ee-none rounded-se-none bg-main-purple absolute top-[17.5px] left-[-11.5px]"
                      onClick={() => {
                        setButtonY2((i + 1) * 75 - 75);
                        setTargetedTask2(i + 1);
                      }}
                    />
                  </div>
                  {isEditing[0] !== i || isEditing[1] === 0 ? (
                    <div
                      className={`px-4 py-3 border-[0.75px] dark:text-white ${
                        isLast ? "border-b-[1.5px]" : ""
                      } border-medium-grey h-[75px] flex justify-start items-center`}
                    >
                      <div className="hide-scrollbar overflow-y-scroll w-full max-w-[114px] h-auto max-h-[100%] flex flex-col">
                        {task.category}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`border-[0.75px] dark:text-white ${
                        isLast ? "border-b-[1.5px]" : ""
                      } border-medium-grey h-[75px] w-[147.5px] flex justify-start items-center`}
                    >
                      <div className="hide-scrollbar overflow-y-scroll w-full h-auto max-h-[100%] flex ">
                        <input
                          className="w-[143px] max-w-[143px] h-auto focus:outline-0 bg-white bg-opacity-0 dark:text-white overflow-y-scroll text-left flex items-center mx-4"
                          id={"taskName-" + i}
                          value={value1}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          onFocus={(e) => {
                            setValue1(task.category);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === " ") {
                              e.preventDefault();
                              setValue1(value1 + " ");
                            }
                            if (e.key === "Enter") {
                              onBlur(e, e.target, data.tasks[i].category, i, 1);
                              e.target.blur();
                            }
                          }}
                          autoFocus
                          onChange={(e) => {
                            setValue1(e.target.value);
                          }}
                          onBlur={(e) => {
                            onBlur(e, e.target, data.tasks[i].category, i, 1);
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <div
                    className={`group px-4 border-[0.75px] ${
                      isLast ? "border-b-[1.5px] rounded-ee-[10px]" : ""
                    } border-r-[1.5px] border-medium-grey h-[75px] flex justify-center items-center relative`}
                    id={i + 1}
                  >
                    <Checkbox
                      isChecked={task.completed}
                      onClick={() => {
                        data.tasks[i].completed = !data.tasks[i].completed;
                        console.log(data.tasks[i].completed);
                      }}
                    />
                    <button
                      className="w-[10px] h-[40px] rounded-full rounded-ss-none rounded-es-none bg-red absolute top-[17.5px] right-[-11.5px]"
                      onClick={() => {
                        setButtonY((i + 1) * 75 - 75);
                        setTargetedTask(i + 1);
                      }}
                    />
                  </div>
                </React.Fragment>
              );
            }
          })}
        </div>
        <animated.button
          className="transition-all duration-300 ease-in-out absolute right-[-85px] flex"
          style={{
            top: y.to((y) => 160 + y),
          }}
          onClick={() => {
            if (targetedTask !== 0) {
              data.tasks.splice(targetedTask - 1, 1);
              setButtonY(-75);
              setButtonY2(-75);
              setTargetedTask(0);
              setTargetedTask2(0);
            }
          }}
        >
          <DeleteButton />
        </animated.button>
        <animated.button
          className="transition-all duration-300 ease-in-out absolute left-[-85px] flex"
          style={{
            top: y2.to((y2) => 155 + y2),
          }}
          onClick={() => {
            if (targetedTask2 !== 0) {
              setIsEditing([targetedTask2 - 1, 0]);
            }
          }}
        >
          <EditButton />
        </animated.button>
      </div>
    </div>
  );
};

export default Todo;
