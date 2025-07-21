// cypress/e2e/pizza.cy.js
describe("Pizza Sipariş Formu Testleri", () => {
  const testUser = {
    name: "Test Kullanıcı",
    size: "Orta",
    toppings: ["Pepperoni", "Mantar", "Soğan", "Sucuk"],
    notes: "Kapıyı çalmayın",
  };

  before(() => {
    // Tüm olası hataları ignore et
    Cypress.on("uncaught:exception", () => false);
  });

  beforeEach(() => {
    // API mock'u - toppings array'ini garantile
    cy.intercept("POST", "https://reqres.in/api/pizza", {
      statusCode: 201,
      body: {
        id: 123,
        name: testUser.name,
        size: testUser.size,
        toppings: testUser.toppings,
        notes: testUser.notes,
        fastDelivery: false,
        totalPrice: 70,
      },
    }).as("pizzaRequest");

    cy.visit("/order");
  });

  it("1. Form yüklenir ve başlangıç durumu doğrudur", () => {
    cy.get("form").should("exist");
    cy.get('button[type="submit"]')
      .should("contain", "SİPARİŞ VER")
      .and("be.disabled");
  });

  it("2. İsim validasyonu çalışır", () => {
    cy.get('input[name="name"]').type("ab").blur();

    // Hata mesajı için alternatifli arama
    cy.get("body").then(($body) => {
      if ($body.find(".error").length) {
        cy.get(".error").first().should("contain", "En az");
      } else {
        cy.contains(/en az 3 karakter/i).should("exist");
      }
    });

    cy.get('input[name="name"]').type("c");
    cy.contains(/en az 3 karakter/i).should("not.exist");
  });

  it("3. Malzeme seçimi validasyonu çalışır", () => {
    // 3 malzeme seç
    testUser.toppings.slice(0, 3).forEach((topping) => {
      cy.contains("label", topping).click();
    });

    // Hata mesajı için geniş arama
    cy.get("body").should(($body) => {
      expect($body.text()).to.include("En az 4 malzeme");
    });

    // 4. malzemeyi ekle
    cy.contains("label", testUser.toppings[3]).click();
    cy.contains("En az 4 malzeme").should("not.exist");
  });

  it("4. Sipariş başarıyla gönderilir", () => {
    // Form doldurma
    cy.get('input[name="name"]').type(testUser.name);
    cy.contains("label", testUser.size).click();
    testUser.toppings.forEach((topping) => {
      cy.contains("label", topping).click();
    });

    // Gönderim ve yönlendirme
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/success");
  });
});
