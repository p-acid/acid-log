import styled from "styled-components";

const TagFilter = ({ list, selectedTag, handlePostList, setAllPost }) => {
  return (
    <Wrapper>
      <Title>Tags</Title>
      <TagWrapper>
        <Button key="all" selectedTag={selectedTag === ""} onClick={setAllPost}>
          <span>All</span>
        </Button>
        {list.map((tagItem) => (
          <Button
            key={`${tagItem[0]}_${tagItem[1]}`}
            selectedTag={selectedTag === tagItem[0]}
            onClick={() => handlePostList(tagItem[0])}
          >
            <span>#{tagItem[0]}</span> <span>{tagItem[1]}</span>
          </Button>
        ))}
      </TagWrapper>
    </Wrapper>
  );
};

export default TagFilter;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 3rem 0 4rem;
`;

const Title = styled.h2`
  margin-right: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -2.5px;
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 3rem;
  padding-left: 1rem;
  border-left: 5px solid ${({ theme }) => theme.navy};
  white-space: nowrap;
  overflow-x: scroll;
`;

const Button = styled.button`
  display: flex;
  gap: 0.5rem;
  padding: 0 0.8rem;
  border-radius: 3rem;
  background-color: ${({ theme, selectedTag }) =>
    selectedTag ? "#2d3c54" : theme.navy};
  cursor: pointer;

  * {
    color: white;
  }

  span:last-child {
    font-size: 0.9rem;
    font-weight: bold;
  }

  &:active {
    background-color: #2d3c54;
  }

  &:hover {
    background-color: #394d6b;
  }
`;
