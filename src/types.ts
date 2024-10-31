export interface Person {
  id: number;
  name: string;
  title: string;
}

export interface InterviewData {
  id: number;
  interviewer: Person;
  interviewee: Person;
  timestamp: Date;
  content: string;
}

export interface SelectedText {
  id: number;
  text: string;
  category: string;
  timestamp: Date;
}