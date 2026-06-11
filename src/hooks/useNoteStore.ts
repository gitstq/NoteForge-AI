import { create } from "zustand";

export interface Note {
  id: string;
  title: string;
  content: string;
  folder_id?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  summary?: string;
}

export interface Folder {
  id: string;
  name: string;
  parent_id?: string;
  created_at: string;
}

interface NoteState {
  notes: Note[];
  folders: Folder[];
  currentNote: Note | null;
  currentFolder: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setNotes: (notes: Note[]) => void;
  setFolders: (folders: Folder[]) => void;
  setCurrentNote: (note: Note | null) => void;
  setCurrentFolder: (folderId: string | null) => void;
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (noteId: string) => void;
  addFolder: (folder: Folder) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  folders: [],
  currentNote: null,
  currentFolder: null,
  isLoading: false,
  error: null,

  setNotes: (notes) => set({ notes }),
  setFolders: (folders) => set({ folders }),
  setCurrentNote: (note) => set({ currentNote: note }),
  setCurrentFolder: (folderId) => set({ currentFolder: folderId }),
  addNote: (note) =>
    set((state) => ({
      notes: [note, ...state.notes],
      currentNote: note,
    })),
  updateNote: (note) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === note.id ? note : n)),
      currentNote: note,
    })),
  deleteNote: (noteId) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== noteId),
      currentNote: state.currentNote?.id === noteId ? null : state.currentNote,
    })),
  addFolder: (folder) =>
    set((state) => ({
      folders: [...state.folders, folder],
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
