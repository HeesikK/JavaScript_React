import CustomButton from "./custombutton";

export default {
  title: "Components/CustomButton",
  component: CustomButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

const defaultArgs = {
  children: "BUTTON",
};

// 아래와 같이 작성하면 defaultArgs를 적용하기 어려움..!
// export const Primary = () => <CustomButton variant="primary" size="medium" />;

export const Primary = {
  args: {
    ...defaultArgs,
    variant: "primary",
    size: "small",
    shape: "round",
  },
};
