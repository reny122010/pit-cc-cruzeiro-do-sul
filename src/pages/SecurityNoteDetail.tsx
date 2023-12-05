import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import Header from '../components/Header';
import { Note } from '../entities/Note';
import { getSecurityNotes, updateSecurityNote } from '../services/api';

function FormSkeleton() {
  return (
    <Container>
      <div className="w-36 h-5 mb-3 bg-slate-300 rounded"></div>
      <div className="animate-pulse w-full h-10 bg-slate-300 rounded"></div>
    </Container>
  );
}

function getTotalAmount(note: Note) {
  return note.events?.reduce((acc: number, event) => acc + event.amount, 0);
}

export default function SecurityNoteDetail() {
  const { date, noteId } = useParams();
  const [note, setNote] = useState<Note>({} as Note);
  const [amount, setAmount] = useState<number>();
  const [isLoading, setLoading] = useState<boolean>(true);

  function fetchNoteData() {
    getSecurityNotes(new Date(date as string)).then((notes) => {
      const selectedNote = notes.find((item) => item._id === noteId) as Note;
      setNote(selectedNote);
      setLoading(false);
    });
  }

  function updateNote() {
    setLoading(true);
    updateSecurityNote(
      note._id,
      new Date(date as string),
      amount as number
    ).then(fetchNoteData);
  }

  useEffect(fetchNoteData, []);

  return (
    <main>
      <Header hasBackButton title={note?.name}>
        <button
          onClick={updateNote}
          disabled={isLoading}
          className="rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand/60"
        >
          Atualizar
        </button>
      </Header>
      {isLoading ? (
        <FormSkeleton />
      ) : (
        <Container>
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Quantidade:
          </label>
          <div className="mt-2">
            <div className="rounded-md shadow-sm  ring-1 ring-inset ring-brand focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand">
              <input
                type="number"
                name="amount"
                id="amount"
                defaultValue={getTotalAmount(note)}
                onChange={(e) => setAmount(+e.target.value)}
                className=" w-full border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              />
            </div>
          </div>
        </Container>
      )}
    </main>
  );
}
