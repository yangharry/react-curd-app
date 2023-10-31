import { useEffect, useState } from 'react';
import './App.css';
import Form from './componets/Form';
import Lists from './componets/Lists';
import Notification from './componets/Notification';

function App() {
  const [lists, setLists] = useState([
    { id: '1', title: '쌀', cost: 12000 },
    { id: '2', title: '라면', cost: 12000 },
  ]);

  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');
  const [wave, setWave] = useState(0);

  const [requestStatus, setRequestStatus] = useState();

  useEffect(() => {
    setTimeout(() => {
      setRequestStatus(null);
    }, 3000);
  }, [requestStatus]);
  useEffect(() => {
    let value = 0;
    let isIncreasing = true;

    function updateValue() {
      if (value === lists.length) {
        isIncreasing = false;
      } else if (value === 0) {
        isIncreasing = true;
      }

      value += isIncreasing ? 1 : -1;
      setWave(value);
    }

    const timer = setInterval(updateValue, 300);
    setTimeout(() => {
      clearInterval(timer);
    }, 300 * 2 * lists.length);
  }, [lists]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editMode) {
      let newList = {
        id: Date.now(),
        title: title,
        cost: cost,
      };
      setLists([...lists, newList]);
      setRequestStatus('create');
    } else {
      let eidtList = {
        id: editId,
        title: title,
        cost: cost,
      };

      const newLists = [...lists];
      newLists.splice(
        newLists.findIndex((list) => list.id === editId),
        1,
        eidtList
      );
      setLists(newLists);
      setEditMode(false);
      setRequestStatus('edit');
    }

    setCost('');
    setTitle('');
  };

  let totalCost = 0;
  if (lists.length > 1) {
    totalCost = lists.reduce((acc, cur) => acc + Number(cur.cost), 0);
  } else if (lists.length === 1) {
    totalCost = lists[0].cost;
  }

  let notification;

  if (requestStatus === 'delete') {
    notification = {
      status: 'delete',
      message: '아이템이 삭제되었습니다.',
    };
  }
  if (requestStatus === 'create') {
    notification = {
      status: 'create',
      message: '아이템이 생성되었습니다.',
    };
  }
  if (requestStatus === 'edit') {
    notification = {
      status: 'edit',
      message: '아이템이 수정되었습니다.',
    };
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-orange-300">
      <div className="p-4 w-3/4 lg:max-w-3xl">
        {notification && (
          <Notification
            status={notification.status}
            message={notification.message}
            setRequestStatus={setRequestStatus}
          />
        )}
        <div className=" font-bold text-2xl p-2">예산 계산기</div>
        <div className="w-full  p-4 bg-white rounded shadow ">
          <Form
            editMode={editMode}
            title={title}
            setTitle={setTitle}
            cost={cost}
            setCost={setCost}
            handleSubmit={handleSubmit}
          />
          <Lists
            lists={lists}
            setLists={setLists}
            setRequestStatus={setRequestStatus}
            editMode={editMode}
            setEditMode={setEditMode}
            setCost={setCost}
            setTitle={setTitle}
            setEditId={setEditId}
            wave={wave}
          />
        </div>
        <div className="flex justify-end items-center font-bold text-2xl p-2 ">
          <div>총지출:{totalCost}원</div>
        </div>
      </div>
    </div>
  );
}

export default App;
