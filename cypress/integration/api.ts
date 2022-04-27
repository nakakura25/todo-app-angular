import { Todo } from '../../src/app/models/Todo'
import { Color } from '../../src/app/models/Color'
import { Status } from '../../src/app/models/Status'
import { Category } from '../../src/app/models/Category'

describe('APi Get Data', () => {
  let categoryMap: Map<number, Category> = new Map<number, Category>();
  let colorMap: Map<number, string> = new Map<number, string>();
  let stateMap:  Map<number, string> = new Map<number, string>();
  let todos: Todo[] = [];
//   before(() => {
//     category.map((cat: Category) => {
//       categoryMap.set(cat['id'], cat);
//     });
//     status.map((res: Status) => {
//       stateMap.set(res['code'], res);
//     });
//   })

  it('store test data', () => {
    cy.request('http://localhost:9000/api/todo').then((response) => {
      expect(response.status).to.eq(200)
      return response['body']
    })
    let a = parseFloat("FF");
  });
})
