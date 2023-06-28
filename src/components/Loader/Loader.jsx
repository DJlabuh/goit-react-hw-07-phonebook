import { RotatingLines } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <Wrapper>
      <RotatingLines
        strokeColor="#f38989"
        strokeWidth="5"
        animationDuration="0.75"
        width="40"
        visible={true}
      />
    </Wrapper>
  );
};
