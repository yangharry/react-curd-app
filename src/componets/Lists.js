import React from 'react';

const Lists = React.memo(
  ({ lists, setLists, setRequestStatus, editMode, setEditMode, setTitle, setCost, setEditId, wave }) => {
    const handlerEditMode = (id) => {
      if (editMode) {
        setEditId('');
        setTitle('');
        setCost('');
      } else {
        let list = lists.find((list) => list.id === id);
        setEditId(id);
        setTitle(list.title);
        setCost(list.cost);
      }
    };
    const handleDelete = (id) => {
      let newLists = lists.filter((list) => list.id !== id);
      setLists(newLists);
      setRequestStatus('delete');
    };

    const handelAllDelete = () => {
      setLists([]);
    };
    return (
      <div>
        {lists.map((list, i) => {
          return (
            <div key={list.id} className={`${wave === i + 1 ? 'none' : 'mx-2'} flex border my-2 mb-4 waveEffect`}>
              <div className="w-full flex  p-2">
                <div className="w-full">{list.title}</div>
                <div className="w-full">{list.cost}</div>
              </div>
              <div className="p-2 flex justify-center items-center">
                <i
                  className="px-2 text-green-500 fa-solid fa-pen-to-square cursor-pointer"
                  onClick={() => {
                    handlerEditMode(list.id);
                    setEditMode(!editMode);
                  }}
                ></i>
                <i
                  className="px-2 text-red-500 fa-solid fa-trash-can cursor-pointer"
                  onClick={() => {
                    handleDelete(list.id);
                  }}
                ></i>
              </div>
            </div>
          );
        })}
        <div className="px-2 pb-2 flex items-center">
          <button
            type="submit"
            className="flex items-center p-2 text-white bg-lime-600  rounded btn customShadow"
            onClick={() => {
              handelAllDelete();
            }}
          >
            <span className="px-2">목록 지우기</span>
            <i className="px-2 fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    );
  }
);

export default Lists;
