import { Todo } from '../../src/app/models/Todo'
import { Color } from '../../src/app/models/Color'
import { Status } from '../../src/app/models/Status'
import { Category } from '../../src/app/models/Category'


describe('My First Test', () => {
  let categoryMap: Map<number, Category> = new Map<number, Category>();
  let colorMap: Map<number, string> = new Map<number, string>();
  let stateMap:  Map<number, string> = new Map<number, string>();

  before(() => {
    category.map((cat: Category) => {
      categoryMap.set(cat['id'], cat);
    });
    status.map((res: Status) => {
      stateMap.set(res['code'], res['name']);
    });
    color.map((res: Color) => {
      colorMap.set(res['id'], res['color']);
    });
  })

  it('Visits the todo top page', () => {
    cy.visit('/')
    cy.get("[data-cy='header_title']").contains('Todoアプリ');
    assertCards();
  });

  it('Register todo', () => {
    cy.visit('/')
    cy.get("[data-cy='todo_header_item']").click();
    cy.wait(1000);
    cy.get("#title").siblings("span").contains('Titleは必須です。')
    cy.get("#body").siblings("span").contains('Bodyは必須です。')
    cy.get("#submitBtn").should('be.disabled')
    cy.get("[id=title]").type('testTitle');
    cy.get("[id=body]").type('testbody');
    cy.get("[id=category]").select('2');
    cy.get("#submitBtn").click();
    cy.visit('/')
    cy.get(`[data-cy=title${todo.length}]`).should('have.text', 'testTitle')
    cy.get(`[data-cy=body${todo.length}]`).should('have.text', 'testbody')
    cy.get(`[data-cy=status${todo.length}]`).should('have.text', 'TODO')
    cy.get(`[data-cy=category${todo.length}]`).should('have.text', 'バックエンド')
  });

  it('Update todo', () => {
    cy.visit('/')
    cy.get("[data-cy='card']").last().find(".card_content").click()
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
    cy.get(`[data-cy=title${todo.length}]`).should('have.text', 'testTitleUpd')
    cy.get(`[data-cy=body${todo.length}]`).should('have.text', 'testbodyUpd')
    cy.get(`[data-cy=status${todo.length}]`).should('have.text', '進行中')
    cy.get(`[data-cy=category${todo.length}]`).should('have.text', 'フロントエンド')
  });

  it('Delete todo', () => {
    cy.visit('/')
    cy.get("[data-cy='card']").last().find(".card_footer_item").click()
    assertCards();
  });

  function assertCards() {
    cy.get("[data-cy='card']").each(($el, index, $list) => {
      cy.get(`[data-cy=title${index}]`).should('have.text', todo[index].title)
      cy.get(`[data-cy=body${index}]`).should('have.text', todo[index].body)
      cy.get(`[data-cy=status${index}]`).should('have.text', stateMap.get(todo[index].state))
      cy.get(`[data-cy=category${index}]`).should('have.text', categoryMap.get(todo[index].categoryId).name)
    })
  }


  const todo = [
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
  const color = [
    {
      "id": 5,
      "color": "#00ffd9"
    },
    {
      "id": 1,
      "color": "#ff000087"
    },
    {
      "id": 2,
      "color": "#00d2ff87"
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
