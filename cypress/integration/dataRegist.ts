import { Todo } from '../../src/app/models/Todo'
import { Color } from '../../src/app/models/Color'
import { Status } from '../../src/app/models/Status'
import { Category } from '../../src/app/models/Category'

describe('Make Data', () => {
  let categoryMap: Map<number, Category> = new Map<number, Category>();
  let colorMap: Map<number, string> = new Map<number, string>();
  let stateMap:  Map<number, string> = new Map<number, string>();

  before(() => {
    category.map((cat: Category) => {
      categoryMap.set(cat['id'], cat);
    });
    status.map((res: Status) => {
      stateMap.set(res['code'], res);
    });
  })

  it('store test data', () => {
    cy.visit('/')
    todos.forEach(todo => {
      cy.visit('/')
      cy.wait(1000);
      cy.get("[data-cy='todo_header_item']").click();
      cy.get("[id=title]").type(todo.title);
      cy.get("[id=body]").type(todo.body);
      cy.get("[id=category]").select(String(todo.categoryId));
      cy.get("#submitBtn").click();
    })
  });

  it('Update todo', () => {
    cy.visit('/')
    let i = 0;
    todos.forEach(todo => {
      cy.visit('/')
      cy.get(`[data-cy=content${i}]`).click()
      i++;
      cy.get("[data-cy='upd-form']").each(($el, index, $list) => {
        cy.get("[id=state]").select(String(stateMap.get(todo.state).code));
      })
      cy.get("#submit").click();
    })
  });

  function assertCards() {
    cy.get("[data-cy='card']").each(($el, index, $list) => {
      cy.get(`[data-cy=title${index}]`).should('have.text', todo[index].title)
      cy.get(`[data-cy=body${index}]`).should('have.text', todo[index].body)
      cy.get(`[data-cy=status${index}]`).should('have.text', stateMap.get(todo[index].state))
      cy.get(`[data-cy=category${index}]`).should('have.text', categoryMap.get(todo[index].categoryId).name)
    })
  }

  const todos = [
   {
     "id": 1,
     "categoryId": 1,
     "title": "デザインをいい感じにする",
     "body": "ヘッダーのデザインをもっといい感じに",
     "state": 0
   },
   {
     "id": 12,
     "categoryId": 7,
     "title": "title update",
     "body": "body",
     "state": 0
   },
   {
     "id": 26,
     "categoryId": 26,
     "title": "BtestAAA",
     "body": "CaAA\n\nAAA",
     "state": 2
   },
   {
     "id": 27,
     "categoryId": 2,
     "title": "Crud処理を追加",
     "body": "Crud処理を追加",
     "state": 0
   }
 ]
 const category = [
    {
      "id": 1,
      "name": "フロントエンド",
      "slug": "front",
      "color": 1
    },
    {
      "id": 2,
      "name": "バックエンド",
      "slug": "back",
      "color": 2
    },
    {
      "id": 3,
      "name": "インフラ",
      "slug": "infra",
      "color": 3
    },
    {
      "id": 7,
      "name": "セールス",
      "slug": "sales",
      "color": 5
    },
    {
      "id": 26,
      "name": "バックオフィス",
      "slug": "backoffice",
      "color": 4
    }
 ]
 const status = [
    {
      "code": 0,
      "name": "TODO"
    },
    {
      "code": 1,
      "name": "進行中"
    },
    {
      "code": 2,
      "name": "完了"
    }
  ]
})
