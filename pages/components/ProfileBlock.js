import React from "react";
import TitleBlock from "../ui/TitleBlock";
import ProfileBox from "../../components/ProfileBox";
import { colors } from "../../assets/styles/colors";

const ProfileBlock = ({
  name,
  stars,
  rates,
  reviews,
  description,
  ava,
  handle,
}) => {
  return (
    <TitleBlock title="Профиль">
      <ProfileBox
        name={name}
        stars={stars}
        rates={rates}
        reviews={reviews}
        reviewsColor={colors.blue}
        description={description}
        ava={ava}
        handle={handle}
      />
    </TitleBlock>
  );
};

export default ProfileBlock;
