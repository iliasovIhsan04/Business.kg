import React from "react";
import TitleBlock from "../ui/TitleBlock";
import ProfileBox from "../../components/ProfileBox";

const AccountBlock = ({
  title,
  name,
  nameColor,
  stars,
  rates,
  reviews,
  description,
  ava,
  handle,
}) => {
  return (
    <TitleBlock title={title}>
      <ProfileBox
        name={name}
        nameColor={nameColor}
        stars={stars}
        rates={rates}
        reviews={reviews}
        description={description}
        ava={ava}
        handle={handle}
      />
    </TitleBlock>
  );
};

export default AccountBlock;
