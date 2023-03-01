// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Picture, Todo } = initSchema(schema);

export {
  Picture,
  Todo
};