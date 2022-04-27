import { Todo } from '../../src/app/models/Todo'
import { Color } from '../../src/app/models/Color'
import { Status } from '../../src/app/models/Status'
import { Category } from '../../src/app/models/Category'


describe('My First Test', () => {
  let categoryMap: Map<number, Category> = new Map<number, Category>();
  let colorMap: Map<number, string> = new Map<number, string>();
  let stateMap:  Map<number, string> = new Map<number, string>();
  let todo: Todo[] = [];
  let category: Category[] = [];
  let status: Status[] = [];

  before(() => {
    cy.getTestData();
    cy.wait(1000);
    color.map((res: Color) => {
      colorMap.set(res['id'], res['color']);
    });
  })

  it('Visits the todo top page', () => {
    cy.visit('/')
    cy.get("[data-cy='header_title']").contains('Todoアプリ');
    cy.checkCards();
  });

  it('Register todo', () => {
    cy.visit('/')
    cy.get("[data-cy='todo_header_item']").click();
    cy.get("#title").siblings("span").contains('Titleは必須です。')
    cy.get("#body").siblings("span").contains('Bodyは必須です。')
    cy.get("#submitBtn").should('be.disabled')
    cy.get("[id=title]").type('testTitle');
    cy.get("[id=body]").type('testbody');
    cy.get("[id=category]").select('2');
    cy.get("#submitBtn").click();
    cy.visit('/')
    cy.get(`[data-cy=title${todo.length}]`, { timeout: 10000 }).should('have.text', 'testTitle')
    cy.get(`[data-cy=body${todo.length}]`).should('have.text', 'testbody')
    cy.get(`[data-cy=status${todo.length}]`).should('have.text', 'TODO')
    cy.get(`[data-cy=category${todo.length}]`).should('have.text', 'バックエンド')
    cy.get(`[data-cy=content${todo.length}]`).should('have.attr', 'style', `background-color: rgba(0, 210, 255, 0.53);`)
  });

  it('Update todo', () => {
    cy.visit('/')
    cy.get("[data-cy='card']", { timeout: 10000 }).last().find(".card_content").click()
    cy.get("[data-cy='upd-form']").each(($el, index, $list) => {
      cy.get("[id=title]").clear();
      cy.get("[id=body]").clear();
      cy.get("#title").siblings("span").contains('Titleは必須です。')
      cy.get("#body").siblings("span").contains('Bodyは必須です。')
      cy.get("[id=title]").type('testTitleUpd');
      cy.get("[id=body]").type('testbodyUpd');
      cy.get("[id=category]").select('1');
      cy.get("[id=state]").select('1');
    })
    cy.get("#submit").click();
    cy.visit('/')
    cy.get(`[data-cy=title${todo.length}]`, { timeout: 10000 }).should('have.text', 'testTitleUpd')
    cy.get(`[data-cy=body${todo.length}]`).should('have.text', 'testbodyUpd')
    cy.get(`[data-cy=status${todo.length}]`).should('have.text', '進行中')
    cy.get(`[data-cy=category${todo.length}]`).should('have.text', 'フロントエンド')
    cy.get(`[data-cy=content${todo.length}]`).should('have.attr', 'style', `background-color: rgba(255, 0, 0, 0.53);`)
  });

  it('Delete todo', () => {
    cy.visit('/')
    cy.get("[data-cy='card']", { timeout: 10000 }).last().find(".card_footer_item").click()
    cy.checkCards();
  });

  Cypress.Commands.add('checkCards', () => {
    cy.get("[data-cy='card']", { timeout: 10000 }).each(($el, index, $list) => {
      cy.get(`[data-cy=title${index}]`).should('have.text', todo[index].title)
      cy.get(`[data-cy=body${index}]`).should('have.text', todo[index].body)
      cy.get(`[data-cy=status${index}]`).should('have.text', stateMap.get(todo[index].state))
      cy.get(`[data-cy=category${index}]`).should('have.text', categoryMap.get(todo[index].categoryId).name)
      cy.get(`[data-cy=content${index}]`).should('have.attr', 'style', `background-color: ${colorMap.get(categoryMap.get(todo[index].categoryId).color)};`)
    })
  });

  Cypress.Commands.add('getTestData', () => {
    cy.request('http://localhost:9000/api/todo').then((response) => {
      expect(response.status).to.eq(200)
      todo = response['body']
    })
    cy.request('http://localhost:9000/api/category').then((response) => {
      expect(response.status).to.eq(200)
      category = response['body']
      category.map((cat: Category) => {
        categoryMap.set(cat['id'], cat);
      });
    })
    cy.request('http://localhost:9000/api/status').then((response) => {
      expect(response.status).to.eq(200)
      status = response['body']
      status.map((res: Status) => {
        stateMap.set(res['code'], res['name']);
      });
    })
  })

//   const todo = [
//    {
//      "id": 1,
//      "categoryId": 1,
//      "title": "デザインをいい感じにする",
//      "body": "ヘッダーのデザインをもっといい感じに",
//      "state": 0
//    },
//    {
//      "id": 12,
//      "categoryId": 7,
//      "title": "title update",
//      "body": "body",
//      "state": 0
//    },
//    {
//      "id": 26,
//      "categoryId": 26,
//      "title": "BtestAAA",
//      "body": "CaAA\n\nAAA",
//      "state": 2
//    },
//    {
//      "id": 27,
//      "categoryId": 2,
//      "title": "Crud処理を追加",
//      "body": "Crud処理を追加",
//      "state": 0
//    }
//  ]
//  const category = [
//     {
//       "id": 1,
//       "name": "フロントエンド",
//       "slug": "front",
//       "color": 1
//     },
//     {
//       "id": 2,
//       "name": "バックエンド",
//       "slug": "back",
//       "color": 2
//     },
//     {
//       "id": 3,
//       "name": "インフラ",
//       "slug": "infra",
//       "color": 3
//     },
//     {
//       "id": 7,
//       "name": "セールス",
//       "slug": "sales",
//       "color": 5
//     },
//     {
//       "id": 26,
//       "name": "バックオフィス",
//       "slug": "backoffice",
//       "color": 4
//     }
//  ]
//  const status = [
//     {
//       "code": 0,
//       "name": "TODO"
//     },
//     {
//       "code": 1,
//       "name": "進行中"
//     },
//     {
//       "code": 2,
//       "name": "完了"
//     }
//   ]
  const color = [
    {
      "id": 5,
      "color": "rgb(0, 255, 217)"
    },
    {
      "id": 1,
      "color": "rgba(255, 0, 0, 0.53)"
    },
    {
      "id": 2,
      "color": "rgba(0, 210, 255, 0.53)"
    },
    {
      "id": 3,
      "color": "#00ff47"
    },
    {
      "id": 4,
      "color": "yellow"
    }
  ]
})
