describe("Pizza Sipariş Formu Testleri", () => {
  const testData = {
    name: "Burak Özbudak",
    size: "Orta",
    toppings: ["Pepperoni", "Mantar", "Soğan", "Sucuk"],
    notes: "Kapıyı çalmayın",
  };

  beforeEach(() => {
    cy.visit("/order", {
      timeout: 20000,
      onBeforeLoad(win) {
        // API isteklerini mockla
        cy.stub(win, "fetch")
          .as("fetchStub")
          .resolves({
            ok: true,
            json: () => Promise.resolve({ success: true }),
          });
      },
    });
  });

  it("Form elemanları doğru şekilde yükleniyor", () => {
    // Başlık kontrolü
    cy.contains("h2", "Lezzetli Pizza").should("be.visible");

    // Form alanları
    cy.get('input[type="text"]').should("be.visible");
    cy.contains("label", "Boyut Seç").should("be.visible");
    cy.contains("label", "Ek Malzemeler").should("be.visible");
    cy.get("textarea").should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("Form validasyonları çalışıyor", () => {
    // Boş form kontrolü
    cy.get('button[type="submit"]')
      .should("be.disabled")
      .and("have.attr", "disabled");

    // İsim validasyonu
    cy.get('input[type="text"]').type("ab");
    cy.contains("En az 3 karakter giriniz").should("be.visible");
    cy.get('input[type="text"]').type("c");
    cy.contains("En az 3 karakter giriniz").should("not.exist");

    // Malzeme validasyonu
    ["Pepperoni", "Mantar", "Soğan"].forEach((topping) => {
      cy.contains("label", topping).click();
    });
    cy.contains("En az 4 malzeme seçmelisiniz").should("be.visible");
    cy.contains("label", "Sucuk").click();
    cy.contains("En az 4 malzeme seçmelisiniz").should("not.exist");
  });

  it("Form başarıyla gönderiliyor", () => {
    // API mock
    cy.intercept("POST", "https://reqres.in/api/pizza", {
      statusCode: 201,
      body: {
        id: 123,
        name: testData.name,
        size: testData.size,
        toppings: testData.toppings,
        notes: testData.notes,
      },
    }).as("submitOrder");

    // Form doldur
    cy.get('input[type="text"]').type(testData.name);
    cy.contains("label", testData.size).click();
    testData.toppings.forEach((topping) => {
      cy.contains("label", topping).click();
    });
    cy.get("textarea").type(testData.notes);

    // Gönder
    cy.get('button[type="submit"]').click();

    // API isteğini doğrula
    cy.wait("@submitOrder").then((interception) => {
      expect(interception.request.body).to.deep.equal({
        name: testData.name,
        size: testData.size,
        toppings: testData.toppings,
        notes: testData.notes,
      });
    });

    // Başarı sayfasına yönlendirme
    cy.url().should("include", "/success");
  });

  it("Geçersiz form gönderilemiyor", () => {
    // Farklı geçersiz kombinasyonlar
    const invalidScenarios = [
      { action: () => cy.get('input[type="text"]').type("Ahmet") },
      { action: () => cy.contains("label", "Orta").click() },
      {
        action: () => {
          ["Pepperoni", "Mantar", "Soğan", "Sucuk"].forEach((topping) => {
            cy.contains("label", topping).click();
          });
        },
      },
    ];

    invalidScenarios.forEach((scenario) => {
      scenario.action();
      cy.get('button[type="submit"]').should("be.disabled");
      // Senaryoyu resetle
      cy.reload();
    });
  });
});
