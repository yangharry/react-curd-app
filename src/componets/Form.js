const Form = ({ title, setTitle, cost, setCost, handleSubmit, editMode }) => {
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleCostChange = (e) => {
    setCost(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex p-2">
        <div className="w-full mr-4">
          <div className=" pb-2 text-orange-300 font-bold">지출항목</div>
          <input
            type="text"
            name="title"
            style={{ borderBottom: '1px solid #eab308', flex: '10', padding: '5px' }}
            className="w-full border-orange-300 font-bold"
            placeholder="예) 렌트비"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="w-full">
          <div className=" pb-2  text-orange-300 font-bold">비용</div>
          <input
            type="number"
            step="100"
            name="cost"
            className="w-full border-orange-300 font-bold"
            style={{ borderBottom: '1px solid #eab308', flex: '10', padding: '5px' }}
            placeholder="예) 120000"
            value={cost}
            onChange={handleCostChange}
          />
        </div>
      </div>
      <div className="p-2 flex items-center">
        <button type="submit" className="flex items-center p-2 text-white bg-lime-600  rounded btn customShadow">
          {editMode === true ? <span className="mx-2">수정</span> : <span className="mx-2">제출</span>}
          <i className="mx-2 fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};

export default Form;
