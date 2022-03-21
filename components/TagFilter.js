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
  margin: 3rem 0 4rem;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  font-size: 1.8rem;
  font-weight: 700;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-left: 0.5rem;
  border-left: 5px solid #2d3c54;
  white-space: nowrap;
  overflow-x: scroll;
`;

const Button = styled.button`
  display: flex;
  gap: 0.5rem;
  padding: 0.1rem 0.8rem;
  border-radius: 1.2rem;
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
