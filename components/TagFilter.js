import styled from "styled-components";

const TagFilter = ({ list, selectedTag, handlePostList, setAllPost }) => {
  return (
    <Wrapper>
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
  margin-bottom: 3rem;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  white-space: nowrap;
  overflow-x: scroll;
`;

const Button = styled.button`
  padding: 0.1rem 0.6rem;
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.navy};
  cursor: pointer;
  opacity: ${({ selectedTag }) => selectedTag && 0.7};

  * {
    color: white;
  }

  span:last-child {
    font-weight: bold;
  }

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;
