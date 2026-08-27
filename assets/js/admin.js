(function () {
  "use strict";
  const cfg = window.NPATI_HUB_CONFIG || {};
  const uiLanguage =
    cfg.language === "uk" || String(cfg.market).toUpperCase() === "UA"
      ? "uk"
      : "en";
  const uk = {
    "One workspace for your store, content and publishing.":
      "Єдиний простір для магазину, контенту та публікацій.",
    "Connect your NPATI account or create a new one without leaving WordPress. Social credentials are never stored by WordPress.":
      "Підключіть обліковий запис NPATI або створіть новий у WordPress. Дані соціальних мереж ніколи не зберігаються у WordPress.",
    "Connect NPATI": "Підключити NPATI",
    "Create account": "Створити обліковий запис",
    "Create NPATI account": "Створення облікового запису NPATI",
    Nickname: "Нікнейм",
    Password: "Пароль",
    "The password is sent directly to NPATI Hub and is not stored by WordPress.":
      "Пароль надсилається безпосередньо до NPATI Hub і не зберігається у WordPress.",
    Dashboard: "Панель керування",
    Market: "Маркет",
    Content: "Контент",
    Calendar: "Календар",
    Analytics: "Аналітика",
    Security: "Безпека",
    Settings: "Налаштування",
    "Publication calendar": "Календар публікацій",
    "Activity during the last 12 months": "Активність за останні 12 місяців",
    "Activity level": "Рівень активності",
    Light: "Легка",
    Regular: "Регулярна",
    High: "Висока",
    "Very high": "Дуже висока",
    Peak: "Пік",
    "Connected integrations": "Підключені інтеграції",
    "Accounts available for publications": "Облікові записи для публікацій",
    "No services connected": "Немає підключених сервісів",
    "Connect social services in Connections.":
      "Підключіть соціальні мережі у розділі «Підключення».",
    "+ Add integration": "+ Додати інтеграцію",
    "Create publication": "Створити публікацію",
    "Scheduled publications": "Заплановані публікації",
    "Drafts, queued and scheduled content":
      "Чернетки, публікації в черзі та за розкладом",
    "Nothing scheduled": "Нічого не заплановано",
    "Create a publication without leaving WordPress.":
      "Створіть публікацію, не залишаючи WordPress.",
    "Untitled publication": "Публікація без назви",
    "No description": "Без опису",
    "New publication": "Нова публікація",
    "Edit publication": "Редагувати публікацію",
    "Create, upload and schedule without leaving WordPress.":
      "Створюйте, завантажуйте та плануйте безпосередньо у WordPress.",
    "Choose content": "Оберіть контент",
    "Use NPATI content or WordPress Media Library.":
      "Використовуйте контент NPATI або медіатеку WordPress.",
    "My content": "Мій контент",
    "Upload media": "Завантажити медіа",
    "No marketplace content": "Немає контенту з маркету",
    "Create or import a listing first.":
      "Спочатку створіть або імпортуйте оголошення.",
    "Prepare the post": "Підготуйте публікацію",
    "Text remains editable before publishing.":
      "Текст можна редагувати до публікації.",
    Title: "Заголовок",
    "Post text": "Текст публікації",
    "Link URL": "Посилання",
    "UTM tracking": "UTM-відстеження",
    Source: "Джерело",
    Medium: "Канал",
    Campaign: "Кампанія",
    Publishing: "Публікація",
    "Publish now": "Опублікувати зараз",
    Schedule: "Запланувати",
    Date: "Дата",
    Time: "Час",
    Timezone: "Часовий пояс",
    "Publish to": "Опублікувати в",
    "Select connected accounts.": "Оберіть підключені облікові записи.",
    "Publishing is processed by NPATI Hub.": "Публікацію обробляє NPATI Hub.",
    "Publish / Schedule": "Опублікувати / Запланувати",
    "Save publication": "Зберегти публікацію",
    "Upload or choose WordPress media":
      "Завантажте або виберіть медіа WordPress",
    "Files selected here will be securely transferred to NPATI.":
      "Вибрані файли буде безпечно передано до NPATI.",
    Remove: "Видалити",
    Edit: "Редагувати",
    Cancel: "Скасувати",
    Retry: "Повторити",
    "Try again": "Спробувати знову",
    "We couldn’t complete this action.": "Не вдалося виконати дію.",
    "NPATI is temporarily unavailable. Your WordPress content is safe.":
      "NPATI тимчасово недоступний. Ваш контент WordPress у безпеці.",
    "Your marketplace content": "Ваш контент у маркеті",
    "Listings, videos and shorts from your connected NPATI account.":
      "Оголошення, відео та шортси з підключеного облікового запису NPATI.",
    "+ Create listing": "+ Створити оголошення",
    Listings: "Оголошення",
    Videos: "Відео",
    Shorts: "Шортси",
    Archived: "Архів",
    "No content here yet": "Тут поки немає контенту",
    "Create listing": "Створити оголошення",
    Repost: "Репост",
    Active: "Активні",
    "CREATE LISTING": "СТВОРЕННЯ ОГОЛОШЕННЯ",
    "Create a product": "Створити товар",
    "Complete the listing and review Product Preview before submission.":
      "Заповніть оголошення та перевірте попередній вигляд перед надсиланням.",
    Marketplace: "Маркет",
    "Product details": "Дані товару",
    Category: "Категорія",
    "Choose category": "Оберіть категорію",
    Description: "Опис",
    Price: "Ціна",
    Currency: "Валюта",
    Condition: "Стан",
    Brand: "Бренд",
    Photos: "Фотографії",
    "Location and delivery": "Місцезнаходження та доставка",
    "Saved address": "Збережена адреса",
    "Choose address": "Оберіть адресу",
    Location: "Місцезнаходження",
    "Local pickup": "Самовивіз",
    "Shipping available": "Доступна доставка",
    "Price negotiable": "Можливий торг",
    "Submit listing": "Надіслати оголошення",
    "PRODUCT PREVIEW": "ПОПЕРЕДНІЙ ВИГЛЯД",
    "Add product photos": "Додайте фотографії товару",
    "Product title": "Назва товару",
    "Your product description will appear here.":
      "Тут з’явиться опис вашого товару.",
    "NPATI seller": "Продавець NPATI",
    "History is empty": "Історія порожня",
    "Published, failed and canceled posts will appear here.":
      "Тут з’являться опубліковані, невдалі та скасовані публікації.",
    "Publishing destinations": "Канали публікації",
    "Social credentials stay protected in NPATI Hub and are never stored in WordPress.":
      "Дані соціальних мереж захищені в NPATI Hub і ніколи не зберігаються у WordPress.",
    "Connect another service": "Підключити інший сервіс",
    "Connect service securely": "Безпечно підключити сервіс",
    "Nothing has been published in this section yet.":
      "У цьому розділі ще нічого не опубліковано.",
    "You can upload media or write a new post.":
      "Ви можете завантажити медіа або створити нову публікацію.",
    "Choose media": "Оберіть медіа",
    "Choose product photos or video": "Оберіть фотографії або відео товару",
    "Use selected media": "Використати вибрані медіа",
    "Add at least one product photo or video.":
      "Додайте хоча б одну фотографію або відео товару.",
    "A listing can contain only one video.":
      "Оголошення може містити лише одне відео.",
    "Choose a future listing date and time.":
      "Оберіть майбутню дату й час публікації оголошення.",
    "Connect an account first.": "Спочатку підключіть обліковий запис.",
    "Creating NPATI listing…": "Створюємо оголошення NPATI…",
    "Scheduling publication…": "Плануємо публікацію…",
    "Sending publication…": "Надсилаємо публікацію…",
    "Unable to create listing.": "Не вдалося створити оголошення.",
    "Unable to save publication.": "Не вдалося зберегти публікацію.",
    "Action failed": "Не вдалося виконати дію",
    "Cancel this scheduled publication?":
      "Скасувати цю заплановану публікацію?",
    "NPATI Market is temporarily unavailable.":
      "NPATI Маркет тимчасово недоступний.",
    "Opening secure NPATI sign in…": "Відкриваємо безпечний вхід NPATI…",
    "Unable to connect to NPATI.": "Не вдалося підключитися до NPATI.",
    "Creating your protected NPATI account…":
      "Створюємо захищений обліковий запис NPATI…",
    "NPATI account could not be created.":
      "Не вдалося створити обліковий запис NPATI.",
    "Secure NPATI registration is not available. Deploy the updated Hub first.":
      "Безпечна реєстрація NPATI недоступна. Спочатку оновіть Hub.",
    "NPATI authorization URL is missing.":
      "Відсутнє посилання авторизації NPATI.",
    "NPATI pairing callback is missing.":
      "Відсутнє зворотне посилання підключення NPATI.",
    Overview: "Огляд",
    "Create Post": "Створити публікацію",
    History: "Історія",
    Connections: "Підключення",
    "New Post": "Нова публікація",
    Search: "Пошук",
    Status: "Статус",
    Channels: "Канали",
    Actions: "Дії",
    "WordPress workspace": "Робочий простір WordPress",
    Connected: "Підключено",
    Offline: "Не підключено",
  };
  Object.assign(uk, {
    "Security overview": "Огляд безпеки",
    "Protected connection between this WordPress website and NPATI Hub.":
      "Захищене з’єднання між цим сайтом WordPress і NPATI Hub.",
    "All systems protected": "Усі системи захищені",
    "Review security status": "Перевірте стан безпеки",
    "HTTPS protection": "Захист HTTPS",
    Protected: "Захищено",
    "Action required": "Потрібна дія",
    "Encrypted connection for this WordPress website.":
      "Зашифроване з’єднання для цього сайту WordPress.",
    "NPATI connection": "З’єднання NPATI",
    Disconnected: "Відключено",
    "Secure account pairing with NPATI Hub.":
      "Безпечне підключення облікового запису до NPATI Hub.",
    Available: "Доступно",
    Unavailable: "Недоступно",
    "Signed webhook verification is available on this server.":
      "На цьому сервері доступна перевірка підписаних webhook.",
    "Social credentials": "Дані соціальних мереж",
    "Not stored": "Не зберігаються",
    "Social-network tokens remain protected inside NPATI Hub.":
      "Токени соціальних мереж залишаються захищеними в NPATI Hub.",
    "Security and connection events from this WordPress website.":
      "Події безпеки та підключення цього сайту WordPress.",
    "No security activity yet": "Подій безпеки ще немає",
    "Connection and API events will appear here.":
      "Події підключення та API з’являться тут.",
    "Connection established": "З’єднання встановлено",
    "Secure pairing started": "Безпечне підключення розпочато",
    "Connection disconnected": "З’єднання відключено",
    "NPATI API request": "Запит до API NPATI",
    "Security settings updated": "Налаштування безпеки оновлено",
    "Signed webhook received": "Підписаний webhook отримано",
    Success: "Успішно",
    Failed: "Помилка",
    "Open profile menu": "Відкрити меню профілю",
    "NPATI profile": "Профіль NPATI",
    "Change profile photo": "Змінити фото профілю",
    "View NPATI profile": "Переглянути профіль NPATI",
    "Choose profile photo": "Оберіть фото профілю",
    "Use this photo": "Використати це фото",
    "Updating profile photo…": "Оновлюємо фото профілю…",
    "Profile photo updated.": "Фото профілю оновлено.",
    "Profile photo could not be updated.": "Не вдалося оновити фото профілю.",
    "Sign out": "Вийти",
    "Sign out of this NPATI account? You can connect another account afterwards.":
      "Вийти з цього облікового запису NPATI? Після цього можна підключити інший обліковий запис.",
    "Signing out…": "Виходимо…",
    "Unable to sign out.": "Не вдалося вийти.",
    "No image": "Немає зображення",
    "Previous media": "Попереднє медіа",
    "Next media": "Наступне медіа",
    "Create repost": "Створити репост",
    "View listing": "Переглянути оголошення",
  });
  Object.assign(uk, {
    Comments: "Коментарі",
    "Comments and interactions are managed securely by NPATI.":
      "Коментарі та взаємодії безпечно обробляються в NPATI.",
    "Close video": "Закрити відео",
    "Open video": "Відкрити відео",
    "Untitled video": "Відео без назви",
  });
  Object.assign(uk, {
    "Loading comments…": "Завантаження коментарів…",
    "Add a comment…": "Додати коментар…",
    "Send comment": "Надіслати коментар",
    "No comments yet": "Коментарів поки немає",
    "Be the first to comment.": "Будьте першим, хто залишить коментар.",
    "Comments could not be loaded.": "Не вдалося завантажити коментарі.",
    Like: "Подобається",
    Share: "Поділитися",
    Save: "Зберегти",
    "Like comment": "Вподобати коментар",
    Unmute: "Увімкнути звук",
    Mute: "Вимкнути звук",
    Reply: "Відповісти",
    "Write a reply…": "Напишіть відповідь…",
    "Send reply": "Надіслати відповідь",
  });
  Object.assign(uk, {
    "Add emoji":
      "\u0414\u043e\u0434\u0430\u0442\u0438 \u0435\u043c\u043e\u0434\u0437\u0456",
    "Choose emoji":
      "\u041e\u0431\u0440\u0430\u0442\u0438 \u0435\u043c\u043e\u0434\u0437\u0456",
    "No content under moderation":
      "\u041d\u0435\u043c\u0430\u0454 \u043a\u043e\u043d\u0442\u0435\u043d\u0442\u0443 \u043d\u0430 \u043c\u043e\u0434\u0435\u0440\u0430\u0446\u0456\u0457",
    "Listings, videos and Shorts awaiting moderation will appear here.":
      "\u0422\u0443\u0442 \u0437\u2019\u044f\u0432\u043b\u044f\u0442\u0438\u043c\u0443\u0442\u044c\u0441\u044f \u043e\u0433\u043e\u043b\u043e\u0448\u0435\u043d\u043d\u044f, \u0432\u0456\u0434\u0435\u043e \u0442\u0430 \u0448\u043e\u0440\u0442\u0441\u0438, \u0449\u043e \u043e\u0447\u0456\u043a\u0443\u044e\u0442\u044c \u043c\u043e\u0434\u0435\u0440\u0430\u0446\u0456\u0457.",
    "Listing actions":
      "\u0414\u0456\u0457 \u0437 \u043e\u0433\u043e\u043b\u043e\u0448\u0435\u043d\u043d\u044f\u043c",
    "Edit listing":
      "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438",
    "Delete listing": "\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438",
    "Edit product":
      "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u0442\u043e\u0432\u0430\u0440",
    "Save changes":
      "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0437\u043c\u0456\u043d\u0438",
    "Delete this listing? This action cannot be undone.":
      "\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u0446\u0435 \u043e\u0433\u043e\u043b\u043e\u0448\u0435\u043d\u043d\u044f? \u0426\u044e \u0434\u0456\u044e \u043d\u0435\u043c\u043e\u0436\u043b\u0438\u0432\u043e \u0441\u043a\u0430\u0441\u0443\u0432\u0430\u0442\u0438.",
    "Updating NPATI listing\u2026":
      "\u041e\u043d\u043e\u0432\u043b\u044e\u0454\u043c\u043e \u043e\u0433\u043e\u043b\u043e\u0448\u0435\u043d\u043d\u044f NPATI\u2026",
    "Unable to update listing.":
      "\u041d\u0435 \u0432\u0434\u0430\u043b\u043e\u0441\u044f \u043e\u043d\u043e\u0432\u0438\u0442\u0438 \u043e\u0433\u043e\u043b\u043e\u0448\u0435\u043d\u043d\u044f.",
    "Unable to delete listing.":
      "\u041d\u0435 \u0432\u0434\u0430\u043b\u043e\u0441\u044f \u0432\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u043e\u0433\u043e\u043b\u043e\u0448\u0435\u043d\u043d\u044f.",
  });
  Object.assign(uk, {
    Delete: "\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438",
  });
  const tr = (value) => {
    if (uiLanguage !== "uk") return value;
    const text = String(value).trim();
    if (uk[text]) return uk[text];
    let match = text.match(/^(\d+) publications?$/);
    if (match) return `${match[1]} публікацій`;
    match = text.match(/^(\d+) connected$/);
    if (match) return `${match[1]} підключено`;
    return (
      {
        active: "активне",
        draft: "чернетка",
        pending: "на модерації",
        rejected: "відхилено",
        scheduled: "заплановано",
        queued: "у черзі",
        processing: "обробляється",
        published: "опубліковано",
        failed: "помилка",
        canceled: "скасовано",
      }[text.toLowerCase()] || value
    );
  };
  function localizeUi(container = document) {
    if (uiLanguage !== "uk" || !container) return;
    const rootNode =
      container.nodeType === 1 || container.nodeType === 9
        ? container
        : container.parentElement;
    if (!rootNode) return;
    const elements = [rootNode, ...(rootNode.querySelectorAll?.("*") || [])];
    elements.forEach((element) => {
      if (["SCRIPT", "STYLE", "TEXTAREA"].includes(element.tagName)) return;
      [...element.childNodes]
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .forEach((node) => {
          const raw = node.nodeValue,
            trimmed = raw.trim(),
            translated = tr(trimmed);
          if (trimmed && translated !== trimmed)
            node.nodeValue = raw.replace(trimmed, translated);
        });
    });
    rootNode
      .querySelectorAll?.("[placeholder],[title],[aria-label]")
      .forEach((node) =>
        ["placeholder", "title", "aria-label"].forEach((attr) => {
          if (node.hasAttribute(attr))
            node.setAttribute(attr, tr(node.getAttribute(attr)));
        }),
      );
  }
  const root = document.getElementById("npati-hub-app");
  const createUuid = () =>
    window.crypto?.randomUUID?.() ||
    `npati-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  document.documentElement.dataset.npatiUiLanguage = uiLanguage;
  if (uiLanguage === "uk") {
    localizeUi(document);
    new MutationObserver((mutations) =>
      mutations.forEach((mutation) => mutation.addedNodes.forEach(localizeUi)),
    ).observe(document.body, { childList: true, subtree: true });
  }
  if (window.wp?.apiFetch)
    wp.apiFetch.use(wp.apiFetch.createNonceMiddleware(cfg.nonce));
  let authRedirecting = false;
  const api = (path, options = {}) =>
    wp.apiFetch({ path: `/npati/v1/${path}`, ...options }).catch((error) => {
      if (
        String(error?.code || "").toLowerCase() === "invalid_api_key" &&
        !authRedirecting
      ) {
        authRedirecting = true;
        try {
          Object.keys(sessionStorage)
            .filter((key) => key.startsWith("npatiHubWorkspace:"))
            .forEach((key) => sessionStorage.removeItem(key));
        } catch (_error) {}
        location.assign(cfg.adminBaseUrl || "admin.php?page=npati");
      }
      throw error;
    });
  function initSettingsAi() {
    const form = document.getElementById("npati-settings-ai-form");
    if (!form) return;
    const key = form.elements.apiKey,
      model = form.elements.model,
      status = form.querySelector("[role=status]"),
      stateNode = form.querySelector("[data-ai-state]"),
      disconnect = form.querySelector('[data-settings-ai="disconnect"]');
    const setState = (value) => {
      stateNode.textContent = value.connected ? "Connected" : "Not connected";
      stateNode.classList.toggle("is-connected", Boolean(value.connected));
      disconnect.hidden = !value.connected;
      if (value.model) {
        const option = new Option(value.model, value.model, true, true);
        model.replaceChildren(option);
      }
      key.placeholder = value.connected
        ? "Connected — enter again to change"
        : "sk-…";
    };
    api("content/ai")
      .then(setState)
      .catch((error) => {
        stateNode.textContent = "Unavailable";
        status.textContent = error.message || "Unable to load OpenAI settings.";
      });
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const submit = form.querySelector('[type="submit"]');
      submit.disabled = true;
      status.textContent = "Saving…";
      try {
        const result = await api("content/ai", {
          method: "POST",
          data: { apiKey: key.value, model: model.value },
        });
        key.value = "";
        setState(result);
        status.textContent = "Saved securely in WordPress.";
      } catch (error) {
        status.textContent =
          error.message || "Unable to save OpenAI connection.";
      } finally {
        submit.disabled = false;
      }
    });
    form
      .querySelector('[data-settings-ai="test"]')
      .addEventListener("click", async (event) => {
        const button = event.currentTarget;
        button.disabled = true;
        status.textContent = "Testing connection…";
        try {
          const result = await api("content/ai/test", {
            method: "POST",
            data: { apiKey: key.value, model: model.value },
          });
          model.replaceChildren(
            ...result.models.map((value) => new Option(value, value)),
          );
          if (result.model) model.value = result.model;
          status.textContent = "Connection successful.";
        } catch (error) {
          status.textContent = error.message || "Connection failed.";
        } finally {
          button.disabled = false;
        }
      });
    disconnect.addEventListener("click", async () => {
      if (!confirm("Disconnect OpenAI from this WordPress site?")) return;
      disconnect.disabled = true;
      status.textContent = "Disconnecting…";
      try {
        await api("content/ai", { method: "DELETE" });
        key.value = "";
        model.replaceChildren(new Option("Test connection to load models", ""));
        setState({ connected: false });
        status.textContent = "OpenAI disconnected.";
      } catch (error) {
        status.textContent = error.message || "Unable to disconnect.";
      } finally {
        disconnect.disabled = false;
      }
    });
  }
  initSettingsAi();

  const authStatus = document.querySelector(".npati-action-status");
  const connectButton = document.querySelector(".npati-connect-button");
  const registerToggle = document.querySelector(".npati-register-toggle");
  const registrationForm = document.getElementById("npati-registration-form");

  const profileTrigger = document.getElementById("npati-profile-trigger");
  const profileDropdown = document.getElementById("npati-profile-dropdown");
  const profileStatus = document.querySelector(".npati-profile-status");
  let activeProfile = null;
  function setProfile(profile) {
    if (!profile) return;
    activeProfile = profile;
    const name = profile.displayName || profile.username || "NPATI";
    const avatar =
      profile.avatar || profile.avatarUrl || profile.avatar_url || "";
    const profileUrl = profile.profileUrl || profile.profile_url || "";
    const initial = String(profile.username || name || "N")
      .charAt(0)
      .toUpperCase();
    document.querySelectorAll("[data-profile-avatar]").forEach((node) => {
      node.textContent = "";
      if (avatar) {
        const img = document.createElement("img");
        img.src = avatar;
        img.alt = "";
        img.referrerPolicy = "no-referrer";
        node.appendChild(img);
      } else node.textContent = initial || node.dataset.fallback || "N";
    });
    const nameNode = document.querySelector("[data-profile-name]");
    if (nameNode)
      nameNode.textContent = profile.username ? `@${profile.username}` : name;
    const emailNode = document.querySelector("[data-profile-email]");
    if (emailNode) emailNode.textContent = profile.email || "";
    const link = document.querySelector("[data-profile-link]");
    if (link && profileUrl) {
      link.href = profileUrl;
      link.hidden = false;
    }
    const listingForm = document.getElementById("npati-listing-form");
    if (listingForm) updateProductPreview(listingForm);
  }
  function closeProfile() {
    if (!profileDropdown) return;
    profileDropdown.hidden = true;
    profileTrigger?.setAttribute("aria-expanded", "false");
  }
  profileTrigger?.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = profileDropdown.hidden;
    profileDropdown.hidden = !open;
    profileTrigger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("click", (event) => {
    if (
      profileDropdown &&
      !profileDropdown.hidden &&
      !event.target.closest(".npati-profile-menu")
    )
      closeProfile();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProfile();
      closeMarketVideo();
      return;
    }
    const card = event.target.closest?.('[data-action="open-market-video"]');
    if (card && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openMarketVideo(card.dataset.videoId);
    }
  });
  document
    .querySelector('[data-profile-action="avatar"]')
    ?.addEventListener("click", () => {
      const frame = wp.media({
        title: tr("Choose profile photo"),
        button: { text: tr("Use this photo") },
        multiple: false,
        library: { type: "image" },
      });
      frame.on("select", async () => {
        const selected = frame.state().get("selection").first()?.toJSON();
        if (!selected) return;
        if (profileStatus)
          profileStatus.textContent = tr("Updating profile photo…");
        try {
          const profile = await api("profile/avatar", {
            method: "POST",
            data: { attachmentId: selected.id },
          });
          setProfile(profile);
          if (profileStatus)
            profileStatus.textContent = tr("Profile photo updated.");
        } catch (error) {
          if (profileStatus)
            profileStatus.textContent =
              error?.message || tr("Profile photo could not be updated.");
        }
      });
      frame.open();
    });
  document
    .querySelector('[data-profile-action="disconnect"]')
    ?.addEventListener("click", async (event) => {
      if (
        !confirm(
          tr(
            "Sign out of this NPATI account? You can connect another account afterwards.",
          ),
        )
      )
        return;
      const button = event.currentTarget;
      button.disabled = true;
      if (profileStatus) profileStatus.textContent = tr("Signing out…");
      try {
        await api("disconnect", { method: "POST" });
        try {
          sessionStorage.removeItem(
            `npatiHubWorkspace:${cfg.connectionId || "unknown"}:${String(cfg.market || "US").toUpperCase()}`,
          );
        } catch (_error) {}
        location.assign(cfg.adminBaseUrl || "admin.php?page=npati");
      } catch (error) {
        button.disabled = false;
        if (profileStatus)
          profileStatus.textContent =
            error?.message || tr("Unable to sign out.");
      }
    });
  if (profileTrigger && cfg.connected) {
    if (cfg.profile) setProfile(cfg.profile);
    else
      api("profile")
        .then(setProfile)
        .catch(() => {});
  }
  connectButton?.addEventListener("click", async () => {
    connectButton.disabled = true;
    if (authStatus) authStatus.textContent = "Opening secure NPATI sign in…";
    try {
      const result = await api("connect", {
        method: "POST",
        data: { intent: "login" },
      });
      if (!result.authorization_url)
        throw new Error("NPATI authorization URL is missing.");
      location.assign(result.authorization_url);
    } catch (error) {
      if (authStatus)
        authStatus.textContent = error.message || "Unable to connect to NPATI.";
      connectButton.disabled = false;
    }
  });
  registerToggle?.addEventListener("click", () => {
    const opening = registrationForm?.hidden !== false;
    if (registrationForm) registrationForm.hidden = !opening;
    registerToggle.setAttribute("aria-expanded", opening ? "true" : "false");
    if (opening && registrationForm)
      requestAnimationFrame(() => {
        registrationForm.scrollIntoView({ behavior: "smooth", block: "start" });
        const first = registrationForm.querySelector("input");
        if (first) {
          try {
            first.focus({ preventScroll: true });
          } catch (_error) {
            first.focus();
          }
        }
      });
  });
  registrationForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!registrationForm.reportValidity()) return;
    const submit = registrationForm.querySelector('[type="submit"]'),
      formData = new FormData(registrationForm);
    submit.disabled = true;
    registerToggle.disabled = true;
    if (authStatus)
      authStatus.textContent = "Creating your protected NPATI account…";
    try {
      const pairing = await api("connect", {
        method: "POST",
        data: { intent: "register" },
      });
      if (
        !pairing.registration_url ||
        !pairing.pairing_id ||
        !pairing.registration_token
      )
        throw new Error(
          "Secure NPATI registration is not available. Deploy the updated Hub first.",
        );
      const response = await fetch(pairing.registration_url, {
        method: "POST",
        credentials: "omit",
        referrerPolicy: "origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pairing_id: pairing.pairing_id,
          registration_token: pairing.registration_token,
          username: String(formData.get("username") || "").trim(),
          email: String(formData.get("email") || "").trim(),
          password: String(formData.get("password") || ""),
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(
          payload?.error?.message ||
            payload?.message ||
            "NPATI account could not be created.",
        );
      registrationForm.reset();
      if (!payload?.data?.callback_url)
        throw new Error("NPATI pairing callback is missing.");
      location.assign(payload.data.callback_url);
    } catch (error) {
      const password = registrationForm.querySelector('[name="password"]');
      if (password) password.value = "";
      if (authStatus)
        authStatus.textContent =
          error.message || "NPATI account could not be created.";
      submit.disabled = false;
      registerToggle.disabled = false;
    }
  });
  if (!root || root.querySelector(".npati-onboarding")) return;
  const esc = (value) =>
    String(value ?? "").replace(
      /[&<>'"]/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[c],
    );
  const closeIcon =
    '<svg class="npati-center-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  const caretLeftIcon =
    '<svg class="npati-center-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>';
  const caretRightIcon =
    '<svg class="npati-center-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>';
  const get = (object, camel, snake) => object?.[camel] ?? object?.[snake];
  const dateOf = (job) =>
    get(job, "publishedAt", "published_at") ||
    get(job, "scheduledAt", "scheduled_at") ||
    get(job, "createdAt", "created_at");
  const formatDate = (value) =>
    value
      ? new Intl.DateTimeFormat(uiLanguage === "uk" ? "uk-UA" : undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(value))
      : "—";
  const state = {
    route: "hub/overview",
    jobs: [],
    accounts: [],
    listings: [],
    assets: [],
    schema: null,
    calendarDate: new Date(),
    composerMedia: [],
    listingMedia: [],
    editingListing: null,
    marketTab: "listings",
    marketContent: { active: [], pending: [], rejected: [], listings: [] },
    marketLoaded: {
      active: false,
      pending: false,
      rejected: false,
      listings: false,
    },
    marketErrors: {},
    marketLoading: "listings",
    publicationView: "scheduled",
    archiveDateFilter: null,
    contentTasks: [],
    contentCategories: [],
    contentLoaded: false,
    contentLoading: false,
    importPreview: null,
    contentSelection: new Set(),
  };
  const workspaceCacheKey = `npatiHubWorkspace:v2:${cfg.connectionId || "unknown"}:${String(cfg.market || "US").toUpperCase()}`;
  const normalizeMarketItems = (value, status) => {
    const items = Array.isArray(value) ? value : value?.items || [];
    return items.map((item) => (item?.status ? item : { ...item, status }));
  };
  const mergeListingStatuses = (active = [], pending = [], rejected = []) => {
    const unique = new Map();
    [...active, ...pending, ...rejected]
      .filter((item) => item?.type === "listing")
      .forEach((item) => unique.set(String(item.id), item));
    return [...unique.values()];
  };
  let workspaceCacheFresh = false;
  function hydrateWorkspaceCache() {
    try {
      const cached = JSON.parse(
        sessionStorage.getItem(workspaceCacheKey) || "null",
      );
      if (!cached || Date.now() - Number(cached.savedAt || 0) > 120000)
        return false;
      state.jobs = Array.isArray(cached.jobs) ? cached.jobs : [];
      state.accounts = Array.isArray(cached.accounts) ? cached.accounts : [];
      state.listings = Array.isArray(cached.listings) ? cached.listings : [];
      state.assets = Array.isArray(cached.assets) ? cached.assets : [];
      state.marketContent.active = Array.isArray(cached.marketContent?.active)
        ? cached.marketContent.active
        : [];
      state.marketContent.pending = Array.isArray(cached.marketContent?.pending)
        ? cached.marketContent.pending
        : [];
      state.marketContent.rejected = Array.isArray(
        cached.marketContent?.rejected,
      )
        ? cached.marketContent.rejected
        : [];
      state.marketContent.listings = state.listings;
      state.marketLoaded.active = true;
      state.marketLoaded.pending = true;
      state.marketLoaded.rejected = true;
      state.marketLoaded.listings = true;
      state.marketLoading = false;
      workspaceCacheFresh = true;
      return true;
    } catch (_error) {
      return false;
    }
  }
  function saveWorkspaceCache() {
    try {
      sessionStorage.setItem(
        workspaceCacheKey,
        JSON.stringify({
          savedAt: Date.now(),
          jobs: state.jobs,
          accounts: state.accounts,
          listings: state.listings,
          marketContent: {
            active: state.marketContent.active,
            pending: state.marketContent.pending,
            rejected: state.marketContent.rejected,
          },
          assets: state.assets,
        }),
      );
    } catch (_error) {}
  }
  function invalidateWorkspaceCache() {
    workspaceCacheFresh = false;
    try {
      sessionStorage.removeItem(workspaceCacheKey);
    } catch (_error) {}
  }
  let hubJobsRefreshPromise = null,
    lastHubJobsRefresh = 0;
  async function refreshHubJobs(force = false) {
    if (hubJobsRefreshPromise) return hubJobsRefreshPromise;
    if (!force && Date.now() - lastHubJobsRefresh < 3000) return false;
    lastHubJobsRefresh = Date.now();
    hubJobsRefreshPromise = api("hub/posts?limit=100")
      .then((result) => {
        const jobs = Array.isArray(result) ? result : result?.items || [],
          before = JSON.stringify(state.jobs),
          after = JSON.stringify(jobs),
          changed = before !== after;
        state.jobs = jobs;
        workspaceCacheFresh = true;
        saveWorkspaceCache();
        if (changed && ["hub/overview", "hub/calendar"].includes(state.route))
          render();
        return changed;
      })
      .finally(() => {
        hubJobsRefreshPromise = null;
      });
    return hubJobsRefreshPromise;
  }

  const icons = {
    facebook:
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M14 8h3V4h-3c-3.3 0-5 2-5 5v2H6v4h3v7h4v-7h3.3l.7-4h-4V9c0-.7.3-1 1-1Z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>',
    telegram:
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="m21.5 3.4-3.2 16.1c-.2 1.1-.9 1.4-1.8.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L5.8 13.3.9 11.8c-1.1-.3-1.1-1.1.2-1.6L20.3 2.8c.9-.3 1.6.2 1.2.6Z"/></svg>',
    pinterest:
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.6 19.3c-.1-1.6 0-3.4.4-4.8l1.3-5.4s-.3-.7-.3-1.8c0-1.7 1-3 2.2-3 1 0 1.6.8 1.6 1.8 0 1.1-.7 2.7-1 4.2-.3 1.3.6 2.3 1.9 2.3 2.3 0 3.8-2.9 3.8-6.3 0-2.6-2.1-4.6-5.5-4.6-4 0-6.5 3-6.5 6.3 0 1.1.3 1.9.8 2.5.2.3.2.4.2.8l-.3 1c-.1.4-.4.5-.8.4-2.8-1.1-4.1-4.1-4.1-7.4C2.1 3.3 6.1 0 12.4 0 18 0 21.7 4 21.7 8.4c0 5.8-3.2 10.1-7.9 10.1-1.6 0-3.1-.9-3.6-1.9l-1 3.8c-.4 1.4-1.1 2.8-1.8 3.8A10 10 0 1 0 12 2Z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M5 8H2v14h4V8H5Zm-.5-6A2.3 2.3 0 1 0 4.5 6.6 2.3 2.3 0 0 0 4.5 2ZM22 13.8c0-4.2-2.2-6.1-5.2-6.1-2.4 0-3.5 1.3-4.1 2.3V8H9v14h3.8v-7c0-1.8.3-3.6 2.6-3.6s2.3 2.1 2.3 3.7V22H22v-8.2Z"/></svg>',
    tumblr:
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M14.1 21.7c-3.42 0-5.97-1.76-5.97-5.98V9.56H5.4V6.23c3.42-.88 4.85-3.8 5.02-6.23h3.12v5.7h4.57v3.86h-4.57v5.35c0 1.58.79 2.13 2.05 2.13.82 0 1.65-.27 2.24-.61l1.19 3.47c-1.04.87-2.92 1.8-4.92 1.8Z"/></svg>',
    bluesky:
      '<svg viewBox="0 0 24 28" preserveAspectRatio="xMidYMid meet"><path fill="currentColor" d="M12 10.8C10.913 8.686 7.954 4.747 5.202 2.805 2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364-4.624.69-8.735 2.385-3.35 8.383C9.577 28.117 11.773 20.681 12 19c.227 1.681 2.422 9.117 8.343 2.994 5.385-5.998 1.274-7.693-3.35-8.383 2.67.296 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/></svg>',
    mastodon:
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M23.2 7.88c0-5.2-3.42-6.73-3.42-6.73C18.06.36 15.1.03 12.04 0h-.08C8.9.03 5.95.36 4.23 1.15c0 0-3.42 1.53-3.42 6.73 0 1.2-.02 2.62.02 4.13.12 5.09.93 10.11 5.64 11.36 2.17.57 4.03.69 5.54.61 2.72-.15 4.25-.98 4.25-.98l-.09-1.97s-1.95.61-4.77.54c-2.8-.1-5.75-.3-6.21-3.75a7 7 0 0 1-.06-.96s2.75.67 6.23.83c2.13.1 4.13-.13 6.15-.37 3.88-.46 7.26-2.85 7.69-5.03.67-3.44.62-8.4.62-8.4Zm-4.03 6.71h-2.56V8.32c0-1.32-.56-1.99-1.67-1.99-1.23 0-1.84.8-1.84 2.37v3.43h-2.55V8.7c0-1.57-.62-2.37-1.84-2.37-1.11 0-1.67.67-1.67 1.99v6.27H4.48V8.13c0-1.32.34-2.37 1.01-3.14.7-.78 1.61-1.18 2.74-1.18 1.31 0 2.3.5 2.96 1.5l.81 1.37.82-1.37c.66-1 1.65-1.5 2.96-1.5 1.13 0 2.04.4 2.74 1.18.67.77 1.01 1.82 1.01 3.14v6.46Z"/></svg>',
    discord:
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52l.21.29a18.3 18.3 0 0 0-5.48 0l.21-.29a19.7 19.7 0 0 0-4.89 1.52c-3.09 4.59-3.92 9.06-3.5 13.47a19.9 19.9 0 0 0 5.99 3.03c.46-.63.87-1.29 1.23-1.99a13 13 0 0 1-1.93-.93l.47-.37c3.71 1.73 7.75 1.73 11.41 0l.47.37c-.61.36-1.25.68-1.92.93.35.7.76 1.36 1.22 1.99a19.8 19.8 0 0 0 6-3.03c.47-5.2-.8-9.69-3.55-13.68ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.98 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z"/></svg>',
    google_business:
      '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22 12.23c0-.71-.06-1.39-.18-2.05H12v3.87h5.62a4.8 4.8 0 0 1-2.08 3.06v2.51h3.37C20.88 17.8 22 15.12 22 12.23Z"/><path fill="#34A853" d="M12 22c2.81 0 5.17-.93 6.91-2.38l-3.37-2.51c-.93.63-2.12 1-3.54 1-2.71 0-5.01-1.83-5.83-4.29H2.69v2.59A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.17 13.82A6 6 0 0 1 5.85 12c0-.63.11-1.24.32-1.82V7.59H2.69A10 10 0 0 0 2 12c0 1.61.38 3.13 1.06 4.41l3.11-2.59Z"/><path fill="#EA4335" d="M12 5.89c1.53 0 2.9.53 3.98 1.56l2.99-2.99A10 10 0 0 0 2.69 7.59l3.48 2.59A6.11 6.11 0 0 1 12 5.89Z"/></svg>',
    wordpress:
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM3.5 12c0-1.2.3-2.4.7-3.4l4 10.9A8.5 8.5 0 0 1 3.5 12Zm8.5 8.5c-.8 0-1.6-.1-2.3-.3l2.6-7.5 2.7 7.3c0 .1.1.2.1.2-1 .2-2 .3-3.1.3Zm1.2-12.4c.5 0 1-.1 1-.1.5-.1.4-.8-.1-.8 0 0-1.5.1-2.5.1s-2.5-.1-2.5-.1c-.5 0-.6.8-.1.8 0 0 .5.1 1 .1l1.5 4-2.1 6.2L6 8.1c.5 0 1-.1 1-.1.5-.1.4-.8-.1-.8l-2.1.1A8.5 8.5 0 0 1 17.6 5c-.1 0-.1 0-.2.1-1.1 0-1.9.9-1.9 2 0 .9.5 1.6 1 2.5.4.7.9 1.6.9 2.9 0 .9-.3 1.9-.8 3.3l-1.1 3.6-3.3-9.8 1-1.5Zm3.4 11.1 2.6-7.6c.5-1.2.7-2.2.7-3.1a8.5 8.5 0 0 1-3.3 10.7Z"/></svg>',
    npati:
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 20V4h4l8 10V4h4v16h-4L8 10v10H4Z"/></svg>',
  };
  const platformName = (value) =>
    String(value || "NPATI")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  const platformIcon = (value) =>
    `<span class="npati-platform-logo ${esc(value)}">${icons[value] || icons.npati}</span>`;
  const empty = (title, copy, action = "") =>
    `<div class="npati-empty-state"><strong>${esc(title)}</strong><span>${esc(copy)}</span>${action}</div>`;
  const errorPanel = (error) =>
    `<div class="npati-error" role="alert"><strong>We couldn’t complete this action.</strong><p>${esc(error?.message || "NPATI is temporarily unavailable. Your WordPress content is safe.")}</p><button class="npati-secondary-button" data-action="reload">Try again</button></div>`;

  const normalizeRoute = (route) =>
    ["dashboard", "analytics", "hub/history"].includes(route)
      ? "market"
      : route;
  function routeFromPage() {
    const hash = location.hash.replace(/^#/, "");
    if (hash) return normalizeRoute(hash);
    const page = root.dataset.page,
      view = root.dataset.view || "overview";
    if (page === "npati-market") return "market";
    if (page === "npati-calendar") return "hub/calendar";
    if (page === "npati-connections") return "hub/connections";
    if (page === "npati-content") return "content";
    return page === "npati-hub-content"
      ? normalizeRoute(`hub/${view}`)
      : "market";
  }
  function navigate(route, replace = false) {
    state.route = normalizeRoute(route);
    const url = `${cfg.adminBaseUrl || "admin.php?page=npati"}#${state.route}`;
    window.history[replace ? "replaceState" : "pushState"]({}, "", url);
    render();
    if (
      workspaceCacheFresh &&
      ["hub/overview", "hub/calendar"].includes(state.route)
    )
      refreshHubJobs().catch(() => {});
    if (["content", "hub/calendar"].includes(state.route))
      loadContentData()
        .then(render)
        .catch(() => {});
  }
  function updateShell() {
    document
      .querySelectorAll(".npati-section-nav a")
      .forEach((a) =>
        a.classList.toggle(
          "active",
          a.dataset.npatiRoute === state.route.split("/")[0] ||
            (a.dataset.npatiRoute === "hub" && state.route.startsWith("hub/")),
        ),
      );
    const isHub = state.route.startsWith("hub/");
    document
      .querySelector(".npati-hub-title")
      ?.classList.toggle("npati-hidden", !isHub);
    document
      .querySelector(".npati-hub-tabs")
      ?.classList.toggle("npati-hidden", !isHub);
    document
      .querySelector(".npati-hub-overview-actions")
      ?.classList.toggle("npati-hidden", state.route !== "hub/overview");
    if (isHub)
      document
        .querySelectorAll(".npati-hub-tabs a")
        .forEach((a) =>
          a.classList.toggle("active", a.dataset.npatiRoute === state.route),
        );
  }
  async function loadContentData(force = false) {
    if (state.contentLoading || (!force && state.contentLoaded)) return;
    state.contentLoading = true;
    try {
      const [tasks, categories] = await Promise.all([
        api("content/tasks?limit=500"),
        api("content/categories").catch(() => []),
      ]);
      state.contentTasks = Array.isArray(tasks) ? tasks : tasks?.items || [];
      state.contentCategories = Array.isArray(categories)
        ? categories
        : categories?.items || [];
      state.contentSelection = new Set(
        [...state.contentSelection].filter((id) =>
          state.contentTasks.some((task) => String(task.id) === id),
        ),
      );
      state.contentLoaded = true;
    } finally {
      state.contentLoading = false;
    }
  }
  async function loadData(force = false) {
    if (!force && workspaceCacheFresh) return;
    const requests = await Promise.allSettled([
      api("hub/posts?limit=100"),
      api("hub/connections"),
      api("market/listings"),
      api("hub/media"),
      api("market/listings?status=pending"),
      api("market/listings?status=rejected"),
    ]);
    state.jobs =
      requests[0].status === "fulfilled"
        ? Array.isArray(requests[0].value)
          ? requests[0].value
          : requests[0].value?.items || []
        : [];
    state.accounts =
      requests[1].status === "fulfilled"
        ? Array.isArray(requests[1].value)
          ? requests[1].value
          : []
        : [];
    state.marketContent.active =
      requests[2].status === "fulfilled"
        ? normalizeMarketItems(requests[2].value, "active")
        : [];
    state.marketContent.pending =
      requests[4].status === "fulfilled"
        ? normalizeMarketItems(requests[4].value, "pending")
        : [];
    state.marketContent.rejected =
      requests[5].status === "fulfilled"
        ? normalizeMarketItems(requests[5].value, "rejected")
        : [];
    state.listings = mergeListingStatuses(
      state.marketContent.active,
      state.marketContent.pending,
      state.marketContent.rejected,
    );
    state.marketContent.listings = state.listings;
    state.marketLoaded.active = requests[2].status === "fulfilled";
    state.marketLoaded.pending = requests[4].status === "fulfilled";
    state.marketLoaded.rejected = requests[5].status === "fulfilled";
    state.marketLoaded.listings =
      state.marketLoaded.active &&
      state.marketLoaded.pending &&
      state.marketLoaded.rejected;
    state.marketErrors.active =
      requests[2].status === "rejected" ? requests[2].reason : null;
    state.marketErrors.listings =
      [requests[2], requests[4], requests[5]].find(
        (request) => request.status === "rejected",
      )?.reason || null;
    state.marketLoading = false;
    state.assets =
      requests[3].status === "fulfilled"
        ? Array.isArray(requests[3].value)
          ? requests[3].value
          : []
        : [];
    workspaceCacheFresh = requests.every(
      (request) => request.status === "fulfilled",
    );
    if (workspaceCacheFresh) saveWorkspaceCache();
  }

  const connectionPlatformNames = {
    facebook: "Facebook Page",
    telegram: "Telegram",
    instagram: "Instagram",
    pinterest: "Pinterest Board",
    linkedin: "LinkedIn",
    tumblr: "Tumblr",
    bluesky: "Bluesky",
    mastodon: "Mastodon",
    discord: "Discord",
    google_business: "Google Business Profile",
  };
  function accountCard(account) {
    const platform = String(account.platform || "npati"),
      display =
        account.displayName || account.display_name || platformName(platform),
      accountId =
        account.platformAccountId ||
        account.platform_account_id ||
        account.accountId ||
        account.account_id ||
        "";
    return `<article class="npati-connection-card" data-route="hub/connections" role="button" tabindex="0" title="${esc(tr("Connections"))}">${platformIcon(platform)}<div class="npati-connection-copy"><strong>${esc(display)}</strong><small>${esc(accountId)}</small><span>${esc(connectionPlatformNames[platform] || platformName(platform))}</span></div><i class="npati-status-dot ${account.status === "connected" ? "" : "is-offline"}" title="${esc(account.status || "connected")}"></i></article>`;
  }
  function publicationDateKeys(job) {
    const published = (Array.isArray(job.targets) ? job.targets : [])
      .map((target) => target.publishedAt || target.published_at)
      .filter(Boolean)
      .map((value) => String(value).slice(0, 10));
    if (published.length) return [...new Set(published)];
    const fallback = dateOf(job);
    return fallback ? [String(fallback).slice(0, 10)] : [];
  }
  function heatmap() {
    const counts = new Map();
    state.jobs
      .filter((job) =>
        ["published", "partially_published", "failed", "cancelled"].includes(
          job.status,
        ),
      )
      .forEach((job) =>
        publicationDateKeys(job).forEach((key) =>
          counts.set(key, (counts.get(key) || 0) + 1),
        ),
      );
    const end = new Date();
    end.setHours(0, 0, 0, 0);
    const start = new Date(end);
    start.setDate(end.getDate() - 364 - end.getDay());
    let cells = "",
      last = -1,
      total = 0,
      index = 0;
    const months = [],
      locale = uiLanguage === "uk" ? "uk-UA" : "en-US";
    for (
      let cursor = new Date(start);
      cursor <= end;
      cursor.setDate(cursor.getDate() + 1), index++
    ) {
      const d = new Date(cursor),
        k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
        n = counts.get(k) || 0,
        dateLabel = d.toLocaleDateString(locale, {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        interactive = n > 0;
      total += n;
      cells += `<i class="${n ? "l" + Math.min(5, n) : ""}${interactive ? " has-publications" : ""}" title="${esc(`${n} ${n === 1 ? "publication" : "publications"} · ${dateLabel}`)}"${interactive ? ` data-action="filter-publications-by-date" data-date="${k}" role="button" tabindex="0" aria-label="${esc(`${n} ${n === 1 ? "publication" : "publications"} · ${dateLabel}`)}"` : ""}></i>`;
      if (d.getMonth() !== last && d.getDay() === 0) {
        months.push(
          `<span style="grid-column:${Math.floor(index / 7) + 1}">${esc(new Intl.DateTimeFormat(locale, { month: "short" }).format(d))}</span>`,
        );
        last = d.getMonth();
      }
    }
    return `<section class="npati-activity-card"><div class="npati-activity-heading"><div><strong>Publication calendar</strong><span>Activity during the last 12 months</span></div><span class="npati-activity-total">${total} publications</span></div><div class="npati-heatmap-scroll"><div class="npati-month-labels">${months.join("")}</div><div class="npati-heatmap-body"><div class="npati-day-labels"><span>Mon</span><span>Wed</span><span>Fri</span></div><div class="npati-heatmap" aria-label="365-day publication activity calendar">${cells}</div></div></div><div class="npati-activity-footer"><span>Activity level</span><div class="npati-legend">${["Light", "Regular", "High", "Very high", "Peak"].map((x, i) => `<span><i class="l${i + 1}"></i>${x}</span>`).join("")}</div></div></section>`;
  }
  function publicationMediaUrls(job) {
    const source = job.mediaUrls || job.media_urls || [];
    return (Array.isArray(source) ? source : [])
      .map((item) =>
        typeof item === "string"
          ? item
          : item?.publicUrl || item?.public_url || item?.url,
      )
      .filter(Boolean);
  }
  function publicationCardType(job) {
    const source =
        job.metadata?.sourceContentType || job.metadata?.source_content_type,
      type = job.mediaType || job.media_type;
    if (
      source === "short" ||
      job.metadata?.publishMode === "reel" ||
      job.metadata?.publish_mode === "reel"
    )
      return "short";
    if (source === "video" || type === "video") return "video";
    return "post";
  }
  function publicationKind(job) {
    const type = publicationCardType(job),
      urls = publicationMediaUrls(job);
    if (["video", "short"].includes(type))
      return {
        label: "Video",
        icon: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3V9Z"/></svg>',
      };
    if (urls.length > 1)
      return {
        label: "Carousel",
        icon: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="16" rx="2"/><path d="M3 7v12a2 2 0 0 0 2 2h10"/></svg>',
      };
    return {
      label: "Photo",
      icon: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m5 18 5-5 3 3 2-2 4 4"/></svg>',
    };
  }
  function publicationMedia(job) {
    const urls = publicationMediaUrls(job),
      type = publicationCardType(job),
      placeholder =
        '<span class="npati-scheduled-placeholder"><svg viewBox="0 0 24 24"><path d="M4 5h16v14H4zM4 15l4-4 4 4 3-3 5 5M15 9h.01"/></svg></span>';
    if (!urls.length) return placeholder;
    if (["video", "short"].includes(type))
      return `<video src="${esc(urls[0])}" muted playsinline preload="metadata"></video>`;
    if (urls.length === 1)
      return `<img src="${esc(urls[0])}" alt="${esc(job.title || "")}" loading="lazy" decoding="async">`;
    return `<div class="npati-scheduled-slides" data-slide-index="0">${urls.map((url, index) => `<img class="npati-scheduled-slide${index === 0 ? " active" : ""}" src="${esc(url)}" alt="${esc(`${job.title || "Publication"} ${index + 1}`)}" loading="lazy" decoding="async">`).join("")}</div><button type="button" class="npati-scheduled-arrow previous" data-action="publication-media-prev" aria-label="Previous photo">${caretLeftIcon}</button><button type="button" class="npati-scheduled-arrow next" data-action="publication-media-next" aria-label="Next photo">${caretRightIcon}</button>`;
  }
  function publicationCard(job) {
    const status = String(job.status || "draft"),
      targets = Array.isArray(job.targets) ? job.targets : [],
      platforms = [
        ...new Set(targets.map((target) => target.platform).filter(Boolean)),
      ],
      kind = publicationKind(job),
      urls = publicationMediaUrls(job),
      date = new Date(dateOf(job) || Date.now()),
      edit = ["draft", "scheduled"].includes(status)
        ? `<button data-action="edit-job" data-id="${esc(job.id)}" title="Edit" aria-label="Edit"><svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16v4M13 7l4 4"/></svg></button>`
        : "",
      cancel =
        status === "scheduled"
          ? `<button class="delete" data-action="cancel" data-id="${esc(job.id)}" title="Cancel" aria-label="Cancel"><svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></svg></button>`
          : "",
      retry =
        status === "failed"
          ? `<button data-action="retry" data-id="${esc(job.id)}">Retry</button>`
          : "";
    return `<article class="npati-publication-card is-${publicationCardType(job)} status-${esc(status)}" data-job-id="${esc(job.id)}"><div class="npati-scheduled-media">${publicationMedia(job)}<div class="npati-scheduled-topline"><span class="npati-scheduled-status">${esc(status.replace(/_/g, " "))}</span><span class="npati-scheduled-kind" title="${esc(kind.label)}">${kind.icon}<span>${esc(kind.label)}</span></span></div>${urls.length > 1 ? `<span class="npati-scheduled-count">1 / ${urls.length}</span>` : ""}</div><div class="npati-publication-body"><div class="npati-publication-top"><h3>${esc(job.title || "Untitled publication")}</h3><div class="npati-card-actions">${edit}${cancel}${retry}</div></div><p>${esc(job.description || "No description")}</p><div class="npati-publication-meta"><div><strong>${esc(date.toLocaleDateString(uiLanguage === "uk" ? "uk-UA" : "en-US", { day: "2-digit", month: "short", year: "numeric" }))}</strong><span>${esc(date.toLocaleTimeString(uiLanguage === "uk" ? "uk-UA" : "en-US", { hour: "2-digit", minute: "2-digit" }))} · ${esc(job.timezone || "UTC")}</span></div><div class="npati-publication-platforms">${platforms.map(platformIcon).join("")}</div></div></div></article>`;
  }
  function bindOverviewMedia() {
    document
      .querySelectorAll(".npati-publication-card video")
      .forEach((video) => {
        const card = video.closest(".npati-publication-card");
        card.addEventListener("mouseenter", () => video.play().catch(() => {}));
        card.addEventListener("mouseleave", () => {
          video.pause();
          video.currentTime = 0;
        });
      });
  }
  function overview() {
    const connected = state.accounts.filter((a) => a.status === "connected"),
      archive = state.publicationView === "archive",
      statuses = archive
        ? ["published", "partially_published", "failed", "cancelled"]
        : ["scheduled", "queued", "processing"];
    let jobs = state.jobs.filter((job) => statuses.includes(job.status));
    if (archive && state.archiveDateFilter)
      jobs = jobs.filter((job) =>
        publicationDateKeys(job).includes(state.archiveDateFilter),
      );
    jobs.sort((a, b) =>
      archive
        ? new Date(dateOf(b)) - new Date(dateOf(a))
        : new Date(dateOf(a)) - new Date(dateOf(b)),
    );
    const dateFilter =
      archive && state.archiveDateFilter
        ? `<button class="npati-archive-date-filter" data-action="clear-activity-filter">${esc(new Date(`${state.archiveDateFilter}T12:00:00`).toLocaleDateString(uiLanguage === "uk" ? "uk-UA" : "en-US", { day: "2-digit", month: "short", year: "numeric" }))}<b aria-hidden="true">×</b></button>`
        : "";
    root.innerHTML = `${heatmap()}<section class="npati-connected-section" aria-label="Connected integrations"><div class="npati-connected-controls"><button type="button" data-action="connections-prev" aria-label="Previous integrations">${caretLeftIcon}</button><button type="button" data-action="connections-next" aria-label="Next integrations">${caretRightIcon}</button></div>${connected.length ? `<div class="npati-connected-carousel">${connected.map(accountCard).join("")}</div>` : empty("No services connected", "Connect social services in Connections.")}</section><section class="npati-publications"><div class="npati-publications-heading"><div><h2>${archive ? "Publication history" : "Scheduled publications"}</h2><p>${archive ? "Published, failed and canceled posts" : "Queued and scheduled content"}</p></div><div class="npati-publication-view"><button class="${archive ? "" : "active"}" data-action="set-publication-view" data-view="scheduled">Scheduled</button><button class="${archive ? "active" : ""}" data-action="set-publication-view" data-view="archive">Archive</button>${dateFilter}<span>${jobs.length}</span></div></div>${jobs.length ? `<div class="npati-publication-grid">${jobs.map(publicationCard).join("")}</div>` : empty(archive ? "History is empty" : "Nothing scheduled", archive ? "Published, failed and canceled posts will appear here." : "Create a publication without leaving WordPress.")}</section>`;
    bindOverviewMedia();
  }

  function mediaPreview(items, target) {
    return items.length
      ? `<div class="npati-media-grid">${items
          .map((m, i) => {
            const video = String(m.mimeType || m.mime_type || "").startsWith(
                "video/",
              ),
              source =
                m.previewUrl ||
                m.preview_url ||
                m.publicUrl ||
                m.public_url ||
                "";
            return `<figure class="${video ? "is-video" : ""}${m.pending ? " is-uploading" : ""}">${video ? `<video src="${esc(source)}" muted playsinline preload="metadata"></video><span class="npati-media-video-badge" aria-label="Video"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3Z"/></svg></span>` : `<img src="${esc(source)}" alt="">`}${m.pending ? '<span class="npati-media-transfer"><b>Transferring to NPATI…</b></span>' : `<button type="button" data-action="remove-media" data-target="${target}" data-index="${i}" aria-label="Remove">${closeIcon}</button>`}</figure>`;
          })
          .join("")}</div>`
      : "";
  }
  function pickerButton(target, multiple = true) {
    return `<button type="button" class="npati-upload-drop${target === "composer" ? " npati-composer-upload-drop" : ""}" data-action="pick-media" data-target="${target}" data-multiple="${multiple ? "1" : "0"}"><span class="npati-upload-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/></svg></span><strong>${target === "composer" ? "Upload photos or video" : "Upload or choose WordPress media"}</strong><span>${target === "composer" ? "Up to 6 photos (JPEG, PNG, WebP, GIF) or 1 video up to 250 MB (MP4, MOV, WebM)" : "Files selected here will be securely transferred to NPATI."}</span></button>`;
  }
  function composerUploadArea(error = "") {
    const hasVideo = state.composerMedia.some((item) =>
        String(item.mimeType || item.mime_type || "").startsWith("video/"),
      ),
      atCapacity = hasVideo || state.composerMedia.length >= 6;
    return `<div class="npati-composer-upload-grid">${mediaPreview(state.composerMedia, "composer")}${atCapacity ? "" : pickerButton("composer", true)}</div>${error ? `<p class="npati-composer-media-error" role="alert">${esc(error)}</p>` : ""}`;
  }
  function renderComposerUploadArea(error = "") {
    const container = document.getElementById("npati-composer-upload-area");
    if (container) container.innerHTML = composerUploadArea(error);
  }
  function composerTimezone() {
    return (
      {
        US: "America/New_York",
        UA: "Europe/Kyiv",
        CA: "America/Toronto",
        GB: "Europe/London",
      }[String(cfg.market || "US").toUpperCase()] || "America/New_York"
    );
  }
  function clearComposerValidation(form) {
    form
      .querySelectorAll(".npati-composer-field-error")
      .forEach((node) => node.remove());
    form
      .querySelectorAll(".is-invalid,.npati-composer-invalid")
      .forEach((node) =>
        node.classList.remove("is-invalid", "npati-composer-invalid"),
      );
  }
  function showComposerError(form, section, message, field) {
    const block = form.querySelector(`[data-composer-section="${section}"]`),
      control = field ? form.elements[field] : null;
    if (block) block.classList.add("is-invalid");
    if (control) control.classList.add("npati-composer-invalid");
    const anchor = control?.closest("label") || block;
    if (anchor && !anchor.querySelector(":scope > .npati-composer-field-error"))
      anchor.insertAdjacentHTML(
        "beforeend",
        `<small class="npati-composer-field-error" role="alert">${esc(message)}</small>`,
      );
    return control || block;
  }
  function failComposer(form, errors) {
    const status = form.querySelector("[role=status]");
    clearComposerValidation(form);
    const first = errors
      .map((error) =>
        showComposerError(form, error.section, error.message, error.field),
      )
      .find(Boolean);
    if (status)
      status.textContent =
        uiLanguage === "uk"
          ? "Перевірте підсвічені поля."
          : "Check the highlighted fields.";
    first?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (first?.matches?.("input,select,textarea"))
      setTimeout(() => first.focus({ preventScroll: true }), 250);
    return false;
  }
  function showComposerApiErrors(form, error) {
    const issues = error?.details?.issues || error?.data?.details?.issues;
    if (!Array.isArray(issues) || !issues.length) return false;
    const paths = {
        description: { section: "copy", field: "description" },
        linkUrl: { section: "copy", field: "linkUrl" },
        scheduledAt: { section: "schedule", field: "date" },
        timezone: { section: "schedule", field: "timezone" },
        targets: { section: "targets" },
        mediaUrls: { section: "media" },
        mediaType: { section: "media" },
      },
      mapped = issues
        .map((issue) => ({
          ...paths[issue?.path?.[0]],
          message: issue.message,
        }))
        .filter((issue) => issue.section && issue.message);
    if (!mapped.length) return false;
    failComposer(form, mapped);
    return true;
  }
  function composer(editing = null) {
    const accounts = state.accounts.filter((a) => a.status === "connected");
    if (editing)
      state.composerMedia = (editing.mediaUrls || editing.media_urls || []).map(
        (url) => ({
          publicUrl: url,
          mimeType:
            (editing.mediaType || editing.media_type) === "video"
              ? "video/mp4"
              : "image/jpeg",
        }),
      );
    const listingOptions = state.listings.length
      ? `<div class="npati-listing-picker">${state.listings.map((item) => `<label class="npati-picker-item"><input type="radio" name="listing" value="${esc(item.id)}"><span><strong>${esc(item.title || item.type)}</strong><small>${esc(item.type || "listing")} · ${esc((item.description || "").slice(0, 80))}</small></span></label>`).join("")}</div>`
      : empty(
          "No marketplace content",
          "You can upload media or write a new post.",
        );
    const targetOptions = accounts.length
      ? `<div class="npati-target-list">${accounts.map((a) => `<label class="npati-target-option"><input type="checkbox" name="target" value="${esc(a.platform + "|" + a.id)}">${platformIcon(a.platform)}<span><strong>${esc(a.displayName || a.display_name || platformName(a.platform))}</strong><small>${esc(platformName(a.platform))}</small></span></label>`).join("")}</div>`
      : empty("No destinations", "Connect an account first.");
    const local =
      editing?.scheduledAt || editing?.scheduled_at
        ? new Date(editing.scheduledAt || editing.scheduled_at)
        : new Date(Date.now() + 3600000);
    local.setMinutes(Math.ceil(local.getMinutes() / 15) * 15, 0, 0);
    const localDateValue = `${local.getFullYear()}-${String(local.getMonth() + 1).padStart(2, "0")}-${String(local.getDate()).padStart(2, "0")}`;
    root.innerHTML = `<form id="npati-composer" class="npati-composer-panel" novalidate><header class="npati-composer-header"><p class="npati-eyebrow">NPATI HUB</p><h2>${editing ? "Edit publication" : "New publication"}</h2><p>Create, upload and schedule without leaving WordPress.</p></header><div class="npati-composer-layout"><div class="npati-composer-column"><section class="npati-composer-step"><div class="npati-step-heading"><span class="npati-step-number">1</span><div><h3>Choose content</h3><p>Use NPATI content or WordPress Media Library.</p></div></div><div class="npati-source-tabs"><button class="active" type="button" data-source="listing">My content</button><button type="button" data-source="upload">Upload media</button></div><div data-source-panel="listing">${listingOptions}</div><div data-source-panel="upload" hidden><div id="npati-composer-upload-area">${composerUploadArea()}</div></div></section><section class="npati-composer-step"><div class="npati-step-heading"><span class="npati-step-number">2</span><div><h3>Prepare the post</h3><p>Text remains editable before publishing.</p></div></div><label>Title<input name="title" maxlength="500" value="${esc(editing?.title || "")}"></label><label>Post text<textarea name="description" maxlength="63206" required>${esc(editing?.description || "")}</textarea></label><label>Link URL<input name="linkUrl" type="url" value="${esc(editing?.linkUrl || editing?.link_url || "")}" placeholder="https://"></label><details class="npati-utm"><summary>UTM tracking</summary><div class="npati-form-grid"><label>Source<input name="utmSource" placeholder="Automatic by channel"></label><label>Medium<input name="utmMedium" value="social"></label><label>Campaign<input name="utmCampaign" value="npati_repost"></label><label>Content<input name="utmContent"></label></div></details></section></div><aside class="npati-composer-column"><section class="npati-composer-step"><div class="npati-step-heading"><span class="npati-step-number">3</span><div><h3>Publishing</h3><p>Choose a publication date and time.</p></div></div><div class="npati-schedule-fields"><label>Date<input name="date" type="date" value="${localDateValue}" required></label><label>Time<input name="time" type="time" value="${local.toTimeString().slice(0, 5)}" required></label><label>Timezone<input name="timezone" value="${esc(editing?.timezone || composerTimezone())}" list="npati-composer-timezones" autocomplete="off" required><datalist id="npati-composer-timezones"><option value="America/New_York"><option value="America/Chicago"><option value="America/Denver"><option value="America/Los_Angeles"><option value="America/Toronto"><option value="America/Vancouver"><option value="America/Halifax"><option value="Europe/Kyiv"><option value="Europe/London"><option value="UTC"></datalist></label></div></section><section class="npati-composer-step"><div class="npati-step-heading"><span class="npati-step-number">4</span><div><h3>Publish to</h3><p>Select connected accounts.</p></div></div>${targetOptions}</section></aside></div><footer class="npati-composer-footer"><div><p>Publishing is processed by NPATI Hub.</p><span class="npati-form-status" role="status"></span></div><button type="submit" class="npati-primary-button" ${accounts.length ? "" : "disabled"}>${editing ? "Save publication" : "Schedule publication"}</button></footer></form>`;
    const form = document.getElementById("npati-composer");
    form.dataset.editing = editing?.id || "";
    form
      .querySelectorAll("input[name=listing]")
      .forEach((r) =>
        r.addEventListener("change", () =>
          selectListingForComposer(r.value, form),
        ),
      );
    const composerSections = form.querySelectorAll(".npati-composer-step");
    ["media", "copy", "schedule", "targets"].forEach((name, index) => {
      if (composerSections[index])
        composerSections[index].dataset.composerSection = name;
    });
    if (editing) {
      (editing.targets || []).forEach((t) => {
        const input = form.querySelector(
          `input[value="${CSS.escape(t.platform + "|" + (t.accountId || t.account_id))}"]`,
        );
        if (input) input.checked = true;
      });
    }
    form.addEventListener("submit", submitComposer);
  }
  function selectListingForComposer(id, form) {
    const item = state.listings.find((x) => String(x.id) === String(id));
    if (!item) return;
    form.elements.title.value = item.title || "";
    form.elements.description.value = item.description || item.title || "";
    form.elements.linkUrl.value = item.linkUrl || "";
    state.composerMedia = (
      item.video
        ? [{ publicUrl: item.video, mimeType: "video/mp4" }]
        : (item.photos || []).map((url) => ({
            publicUrl: url,
            mimeType: "image/jpeg",
          }))
    ).slice(0, 6);
  }
  async function submitComposer(event) {
    event.preventDefault();
    const form = event.currentTarget,
      status = form.querySelector("[role=status]"),
      button = form.querySelector("[type=submit]");
    clearComposerValidation(form);
    status.textContent = "";
    status.classList.remove("npati-composer-validation-summary");
    const message = (en, uk) => (uiLanguage === "uk" ? uk : en),
      errors = [];
    if (state.composerMedia.some((item) => item.pending))
      errors.push({
        section: "media",
        message: message(
          "Wait until all media files finish transferring to NPATI.",
          "Зачекайте, доки всі медіафайли буде передано до NPATI.",
        ),
      });
    if (!form.elements.description.value.trim())
      errors.push({
        section: "copy",
        field: "description",
        message: message(
          "Add a publication description.",
          "Додайте опис публікації.",
        ),
      });
    if (form.elements.linkUrl.value) {
      try {
        const link = new URL(form.elements.linkUrl.value);
        if (!["http:", "https:"].includes(link.protocol)) throw new Error();
      } catch (_error) {
        errors.push({
          section: "copy",
          field: "linkUrl",
          message: message(
            "Enter a valid link, for example https://www.npati.com/.",
            "Введіть коректне посилання, наприклад https://www.npati.com/.",
          ),
        });
      }
    }
    const targets = [...form.querySelectorAll("[name=target]:checked")].map(
      (input) => {
        const [platform, accountId] = input.value.split("|");
        return { platform, accountId };
      },
    );
    if (!targets.length)
      errors.push({
        section: "targets",
        message: message(
          "Choose at least one connected social network.",
          "Оберіть хоча б одну підключену соціальну мережу.",
        ),
      });
    const localValue = `${form.elements.date.value}T${form.elements.time.value}`,
      date = new Date(localValue);
    let scheduledAt;
    if (
      !form.elements.date.value ||
      !form.elements.time.value ||
      Number.isNaN(date.getTime())
    )
      errors.push({
        section: "schedule",
        field: !form.elements.date.value ? "date" : "time",
        message: message(
          "Choose a publication date and time.",
          "Оберіть дату й час публікації.",
        ),
      });
    else if (date <= new Date())
      errors.push({
        section: "schedule",
        field: "date",
        message: message(
          "The date and time must be in the future.",
          "Дата й час мають бути в майбутньому.",
        ),
      });
    else scheduledAt = date.toISOString();
    const timezone = form.elements.timezone.value.trim();
    try {
      if (!timezone) throw new RangeError();
      new Intl.DateTimeFormat("en", { timeZone: timezone }).format();
    } catch (_error) {
      errors.push({
        section: "schedule",
        field: "timezone",
        message: message(
          `Enter a valid time zone, for example ${composerTimezone()}.`,
          `Введіть коректний часовий пояс, наприклад ${composerTimezone()}.`,
        ),
      });
    }
    const mediaUrls = state.composerMedia
        .map((item) => item.publicUrl || item.public_url)
        .filter(Boolean),
      videoItem = state.composerMedia.find((item) =>
        String(item.mimeType || item.mime_type).startsWith("video/"),
      ),
      mediaType = videoItem ? "video" : mediaUrls.length ? "image" : "none";
    if (mediaType === "video" && mediaUrls.length !== 1)
      errors.push({
        section: "media",
        message: message(
          "Choose one video for this publication.",
          "Оберіть одне відео для цієї публікації.",
        ),
      });
    if (mediaType === "image" && mediaUrls.length > 6)
      errors.push({
        section: "media",
        message: message(
          "Choose no more than 6 photos.",
          "Оберіть не більше 6 фотографій.",
        ),
      });
    if (
      targets.some((target) =>
        ["instagram", "pinterest"].includes(target.platform),
      ) &&
      !mediaUrls.length
    )
      errors.push({
        section: "media",
        message: message(
          "Instagram and Pinterest publications require a photo or video.",
          "Для Instagram і Pinterest потрібно додати фото або відео.",
        ),
      });
    if (errors.length) return failComposer(form, errors);
    const sourceContentId =
        form.querySelector("input[name=listing]:checked")?.value || undefined,
      data = {
        action: "publish",
        idempotencyKey: createUuid(),
        title: form.elements.title.value || undefined,
        description: form.elements.description.value,
        linkUrl: form.elements.linkUrl.value || undefined,
        mediaUrls,
        mediaType,
        hashtags: [],
        targets,
        market: cfg.market,
        scheduledAt,
        timezone,
        metadata: {
          source: "wordpress",
          sourceContentId,
          publishMode: "schedule",
          shareToFeed: true,
          pinterestCoverImageUrl: videoItem?.coverUrl || undefined,
          utm: {
            source: form.elements.utmSource.value,
            medium: form.elements.utmMedium.value,
            campaign: form.elements.utmCampaign.value,
            content: form.elements.utmContent.value,
          },
        },
      };
    button.disabled = true;
    status.textContent = message(
      "Scheduling publication…",
      "Плануємо публікацію…",
    );
    try {
      const id = form.dataset.editing;
      if (id) await api(`hub/posts/${id}`, { method: "PATCH", data });
      else await api("hub/posts", { method: "POST", data });
      invalidateWorkspaceCache();
      await loadData(true);
      state.publicationView = "scheduled";
      state.archiveDateFilter = null;
      navigate("hub/overview");
    } catch (error) {
      const code = String(error?.code || "").toLowerCase();
      if (!showComposerApiErrors(form, error))
        status.textContent =
          code === "wordpress_scope_denied"
            ? "WordPress publishing permission is missing. Apply Hub migration 014_wordpress_workspace_scopes.sql, deploy Hub, and reconnect this WordPress site."
            : error?.message || "Unable to save publication.";
      button.disabled = false;
    }
  }

  const marketTabs = {
    listings: { label: "Listings", status: "listings", type: "listing" },
    videos: { label: "Videos", status: "active", type: "video" },
    shorts: { label: "Shorts", status: "active", type: "short" },
  };
  const compactNumber = (value) =>
    new Intl.NumberFormat(uiLanguage === "uk" ? "uk-UA" : "en-US", {
      notation: Number(value) >= 10000 ? "compact" : "standard",
      maximumFractionDigits: 1,
    }).format(Number(value) || 0);
  const listingDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? ""
      : new Intl.DateTimeFormat(uiLanguage === "uk" ? "uk-UA" : "en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(date);
  };
  const listingPrice = (value, currency, country) => {
    const amount = Number(value) || 0,
      symbol =
        { UA: "грн", US: "$", CA: "C$", GB: "£" }[
          String(country || "").toUpperCase()
        ] ||
        { UAH: "грн", USD: "$", CAD: "C$", GBP: "£" }[
          String(currency || "").toUpperCase()
        ] ||
        currency ||
        "";
    return `${new Intl.NumberFormat(uiLanguage === "uk" ? "uk-UA" : "en-US", { maximumFractionDigits: 2 }).format(amount)} ${symbol}`.trim();
  };
  function listingMedia(item) {
    const media = (Array.isArray(item.photos) ? item.photos : [])
      .filter(Boolean)
      .map((url) => ({ type: "image", url }));
    if (item.video)
      media.push({
        type: "video",
        url: item.video,
        poster: item.thumbnail || "",
      });
    else if (
      item.thumbnail &&
      !media.includes(item.thumbnail) &&
      !media.some((entry) => entry.url === item.thumbnail)
    )
      media.push({ type: "image", url: item.thumbnail });
    return media;
  }
  const verificationBadgeColors = {
    "sat-deep-orange": "#FF5722",
    "sat-pink-6": "#FF10F0",
    "sat-bright-blue": "#00BFFF",
    "sat-emerald-green": "#059669",
    "sat-gold": "#D4AF37",
    "sat-violet": "#8A2BE2",
  };
  function verificationSealPath(size = 16) {
    const center = size / 2,
      outer = size * 0.46,
      inner = size * 0.4,
      points = [];
    for (let index = 0; index < 24; index++) {
      const angle = (Math.PI * index) / 12,
        radius = index % 2 === 0 ? outer : inner;
      points.push({
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
      });
    }
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let index = 1; index < points.length; index++) {
      const previous = points[index - 1],
        current = points[index];
      path += ` Q ${previous.x + (current.x - previous.x) * 0.3} ${previous.y + (current.y - previous.y) * 0.3} ${current.x} ${current.y}`;
    }
    const last = points[points.length - 1],
      first = points[0];
    return `${path} Q ${last.x + (first.x - last.x) * 0.3} ${last.y + (first.y - last.y) * 0.3} ${first.x} ${first.y} Z`;
  }
  function listingVerificationBadge(author) {
    if (!author?.isVerified) return "";
    const type =
        author.verificationBadgeType ||
        author.verification_badge_type ||
        "sat-gold",
      color =
        verificationBadgeColors[type] || verificationBadgeColors["sat-gold"],
      tooltip =
        author.verificationTooltip ||
        author.verification_tooltip ||
        (uiLanguage === "uk" ? "Верифікований акаунт" : "Verified account");
    return `<span class="npati-verification-badge" data-verification-tooltip="${esc(tooltip)}" role="img" aria-label="${esc(tooltip)}" style="--npati-verification-color:${color}"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="${verificationSealPath()}"/><polyline points="5.6,8 7.36,9.92 10.4,6.08"/></svg></span>`;
  }
  let activeVerificationTooltip = null;
  function closeVerificationTooltip() {
    activeVerificationTooltip?.remove();
    activeVerificationTooltip = null;
  }
  function openVerificationTooltip(badge) {
    closeVerificationTooltip();
    const text = badge.dataset.verificationTooltip;
    if (!text) return;
    const tooltip = document.createElement("div");
    tooltip.className = "npati-verification-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.textContent = text;
    document.body.append(tooltip);
    const rect = badge.getBoundingClientRect(),
      tip = tooltip.getBoundingClientRect(),
      showBelow = rect.top < tip.height + 12;
    tooltip.classList.toggle("is-below", showBelow);
    tooltip.style.left = `${Math.max(8, Math.min(window.innerWidth - tip.width - 8, rect.left + rect.width / 2 - tip.width / 2))}px`;
    tooltip.style.top = `${showBelow ? rect.bottom + 7 : rect.top - tip.height - 7}px`;
    activeVerificationTooltip = tooltip;
  }
  function bindListingVerificationBadges() {
    root.querySelectorAll(".npati-verification-badge").forEach((badge) => {
      badge.addEventListener("mouseenter", () =>
        openVerificationTooltip(badge),
      );
      badge.addEventListener("mouseleave", closeVerificationTooltip);
      badge.addEventListener("focus", () => openVerificationTooltip(badge));
      badge.addEventListener("blur", closeVerificationTooltip);
    });
  }
  function enhanceListingActionMenus() {
    const shareIcon =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5h4v4M19 5l-9 9"/><path d="M13 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7"/></svg>';
    root.querySelectorAll(".npati-listing-actions-menu").forEach((menu) => {
      const edit = menu.querySelector('[data-action="edit-listing"]'),
        remove = menu.querySelector('[data-action="delete-listing"]'),
        id = edit?.dataset.id || remove?.dataset.id || "";
      if (!menu.querySelector('[data-action="share-listing"]'))
        menu.insertAdjacentHTML(
          "afterbegin",
          `<button type="button" data-action="share-listing" data-id="${esc(id)}">${shareIcon}<span>${esc(tr("Share"))}</span></button>`,
        );
      const editLabel = edit?.querySelector("span"),
        deleteLabel = remove?.querySelector("span");
      if (editLabel) editLabel.textContent = tr("Edit");
      if (deleteLabel) deleteLabel.textContent = tr("Delete");
    });
  }
  function listingCard(item) {
    const media = listingMedia(item),
      author =
        item.author && typeof item.author === "object" ? item.author : {},
      username = author.username || "",
      authorName = username
        ? `@${username}`
        : author.displayName ||
          [author.firstName, author.lastName].filter(Boolean).join(" "),
      avatar = author.avatar || "",
      initial = String(authorName || "N")
        .replace(/^@/, "")
        .charAt(0)
        .toUpperCase(),
      showAuthor = item.showAuthor !== false && Boolean(authorName),
      country = String(item.country || cfg.market || "US").toUpperCase(),
      current =
        Number(item.discountPrice) > 0 ? item.discountPrice : item.price,
      old = Number(item.discountPrice) > 0 ? item.price : null;
    const slides = media.length
      ? media
          .map((entry, index) =>
            entry.type === "video"
              ? `<video class="npati-listing-slide${index ? "" : " is-active"}" data-slide="${index}" src="${esc(entry.url)}"${entry.poster ? ` poster="${esc(entry.poster)}"` : ""} muted loop playsinline preload="metadata" aria-label="${esc(item.title || "Listing video")}"></video><div class="npati-listing-video-ui${index ? "" : " is-active"}" data-video-ui data-slide="${index}"><button type="button" class="npati-video-sound" data-action="listing-video-sound" aria-label="Unmute"><svg class="is-muted" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6.5 9H3v6h3.5l4.5 4V5Z"/><path d="m16 9 5 6M21 9l-5 6"/></svg><svg class="is-audible" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6.5 9H3v6h3.5l4.5 4V5Z"/><path d="M15 9.5a4 4 0 0 1 0 5M18 7a7 7 0 0 1 0 10"/></svg></button><div class="npati-video-progress"><i></i></div></div>`
              : `<img class="npati-listing-slide${index ? "" : " is-active"}" data-slide="${index}" src="${esc(entry.url)}" alt="${esc(item.title || "")}" loading="lazy" decoding="async">`,
          )
          .join("")
      : '<span class="npati-listing-no-media">No image</span>';
    const carousel =
      media.length > 1
        ? `<button type="button" class="npati-listing-carousel-button is-prev" data-action="listing-media-prev" aria-label="Previous media"><svg viewBox="0 0 256 256" aria-hidden="true"><path d="M168.49 199.51a12 12 0 0 1-17 17l-80-80a12 12 0 0 1 0-17l80-80a12 12 0 0 1 17 17L97 128Z"/></svg></button><button type="button" class="npati-listing-carousel-button is-next" data-action="listing-media-next" aria-label="Next media"><svg viewBox="0 0 256 256" aria-hidden="true"><path d="m184.49 136.49-80 80a12 12 0 0 1-17-17L159 128 87.51 56.49a12 12 0 1 1 17-17l80 80a12 12 0 0 1 0 17Z"/></svg></button><div class="npati-listing-dots">${media.map((_, index) => `<button type="button" class="${index ? "" : "is-active"}" data-action="listing-media-dot" data-index="${index}" aria-label="Media ${index + 1}"></button>`).join("")}</div>`
        : "";
    const authorContent = `${avatar ? `<img src="${esc(avatar)}" alt="">` : `<span>${esc(initial)}</span>`}<strong>${esc(authorName)}</strong>${listingVerificationBadge(author)}`;
    const authorBlock = showAuthor
      ? author.profileUrl
        ? `<a class="npati-listing-author" href="${esc(author.profileUrl)}" target="_blank" rel="noopener">${authorContent}</a>`
        : `<div class="npati-listing-author">${authorContent}</div>`
      : "";
    const rawStatus = String(item.status || "").toLowerCase(),
      status =
        rawStatus && rawStatus !== "active"
          ? `<span class="npati-listing-status is-${esc(rawStatus)}" data-listing-status="${esc(rawStatus)}">${esc(tr(rawStatus))}</span>`
          : "";
    const dotsIcon =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg>',
      editIcon =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4M13 7l4 4"/></svg>',
      deleteIcon =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></svg>';
    return `<article class="npati-listing-card${item.video && !item.photos?.length ? " is-video-only" : ""}" data-listing-id="${esc(item.id)}" data-current-slide="0"><div class="npati-listing-media">${slides}${authorBlock}${status}<button type="button" class="npati-listing-likes${item.isLiked ? " is-liked" : ""}" data-action="toggle-listing-like" aria-pressed="${item.isLiked ? "true" : "false"}" aria-label="${esc(compactNumber(item.likesCount))} likes"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"/></svg><span>${esc(compactNumber(item.likesCount))}</span></button>${carousel}</div><div class="npati-listing-body"><div class="npati-listing-title-row"><h3>${esc(item.title || "Untitled")}</h3><div class="npati-listing-menu-wrap"><button type="button" class="npati-listing-menu" data-action="toggle-listing-menu" data-id="${esc(item.id)}" aria-label="${esc(tr("Listing actions"))}" aria-expanded="false">${dotsIcon}</button><div class="npati-listing-actions-menu" hidden><button type="button" data-action="edit-listing" data-id="${esc(item.id)}">${editIcon}<span>${esc(tr("Edit listing"))}</span></button><button type="button" class="is-danger" data-action="delete-listing" data-id="${esc(item.id)}">${deleteIcon}<span>${esc(tr("Delete listing"))}</span></button></div></div></div><div class="npati-listing-price-row"><div><strong class="${item.isFree ? "is-free" : ""}">${item.isFree ? esc(uiLanguage === "uk" ? "Безкоштовно" : "Free") : esc(listingPrice(current, item.currency, country))}</strong>${old ? `<del>${esc(listingPrice(old, item.currency, country))}</del>` : ""}</div>${item.linkUrl ? `<a class="npati-listing-open" href="${esc(item.linkUrl)}" target="_blank" rel="noopener" aria-label="View listing"><svg viewBox="0 0 256 256" aria-hidden="true"><path d="M224.49 136.49l-72 72a12 12 0 0 1-17-17L187 140H40a12 12 0 0 1 0-24h147l-51.49-51.52a12 12 0 0 1 17-17l72 72a12 12 0 0 1 0 17.01Z"/></svg></a>` : ""}</div><div class="npati-listing-meta"><div>${item.location ? `<strong>${esc(item.location)}</strong>` : ""}${item.createdAt ? `<time datetime="${esc(item.createdAt)}">${esc(listingDate(item.createdAt))}</time>` : ""}</div><span class="npati-listing-views"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></svg>${esc(compactNumber(item.viewsCount))}</span></div></div></article>`;
  }
  const eyeIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></svg>';
  const heartIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"/></svg>';
  const commentIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.7-4.4A8.1 8.1 0 0 1 3 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z"/></svg>';
  const shareIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.7 10.7 6.6-4.3M8.7 13.3l6.6 4.3"/></svg>';
  const bookmarkIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4V4Z"/></svg>';
  const sendIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></svg>';
  const emojiCategories = {
    faces: {
      icon: "😊",
      items: [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "🤣",
        "😂",
        "🙂",
        "🙃",
        "😉",
        "😊",
        "😇",
        "🥰",
        "😍",
        "🤩",
        "😘",
        "😗",
        "😚",
        "😙",
        "😋",
        "😛",
        "😜",
        "🤪",
        "😝",
        "🤑",
        "🤗",
        "🤭",
        "🤫",
        "🤔",
        "🤐",
        "🤨",
        "😐",
        "😑",
        "😶",
        "😏",
        "😒",
        "🙄",
        "😬",
        "🤥",
        "😔",
        "😪",
        "🤤",
        "😴",
        "😷",
        "🤒",
        "🤕",
        "🤢",
        "🤮",
        "🤧",
        "🥵",
        "🥶",
        "🥴",
        "😵",
        "🤯",
        "🤠",
        "🥳",
        "😎",
        "🤓",
        "🧐",
      ],
    },
    hearts: {
      icon: "❤️",
      items: [
        "❤️",
        "🧡",
        "💛",
        "💚",
        "💙",
        "💜",
        "🖤",
        "🤍",
        "🤎",
        "💔",
        "❣️",
        "💕",
        "💞",
        "💓",
        "💗",
        "💖",
        "💘",
        "💝",
        "💟",
      ],
    },
    gestures: {
      icon: "👍",
      items: [
        "👍",
        "👎",
        "👌",
        "🤌",
        "🤏",
        "✌️",
        "🤞",
        "🤟",
        "🤘",
        "🤙",
        "👈",
        "👉",
        "👆",
        "🖕",
        "👇",
        "☝️",
        "👋",
        "🤚",
        "🖐️",
        "✋",
        "🖖",
        "👏",
        "🙌",
        "🤲",
        "🤝",
        "🙏",
        "💪",
        "🦾",
        "🦿",
        "🦵",
        "🦶",
      ],
    },
    activities: {
      icon: "🎉",
      items: [
        "🎉",
        "🎊",
        "🎈",
        "🎁",
        "🎀",
        "🎂",
        "🍰",
        "🧁",
        "🥳",
        "🎭",
        "🎨",
        "🎪",
        "🎫",
        "🎤",
        "🎧",
        "🎼",
        "🎵",
        "🎶",
        "🎹",
        "🥁",
        "🎷",
        "🎺",
        "🎸",
        "🪕",
        "🎻",
      ],
    },
    objects: {
      icon: "📱",
      items: [
        "📱",
        "💻",
        "⌨️",
        "🖥️",
        "🖨️",
        "🖱️",
        "🖲️",
        "💽",
        "💾",
        "💿",
        "📀",
        "📼",
        "📷",
        "📸",
        "📹",
        "🎥",
        "📽️",
        "🎞️",
        "📞",
        "☎️",
        "📟",
        "📠",
        "📺",
        "📻",
        "🎙️",
        "🎚️",
        "🎛️",
      ],
    },
    nature: {
      icon: "🌸",
      items: [
        "🌸",
        "💐",
        "🏵️",
        "🌹",
        "🥀",
        "🌺",
        "🌻",
        "🌼",
        "🌷",
        "🌱",
        "🪴",
        "🌲",
        "🌳",
        "🌴",
        "🌵",
        "🌶️",
        "🍄",
        "🌾",
        "💫",
        "⭐",
        "🌟",
        "✨",
        "⚡",
        "☄️",
        "💥",
        "🔥",
        "🌈",
        "☀️",
        "🌤️",
        "⛅",
        "🌦️",
        "🌧️",
        "⛈️",
        "🌩️",
        "🌨️",
        "❄️",
        "☃️",
        "⛄",
        "🌬️",
        "💨",
      ],
    },
  };
  function enhanceCommentComposer(form, viewer) {
    if (!form || form.dataset.emojiPickerBound) return;
    form.dataset.emojiPickerBound = "1";
    const textarea = form.querySelector("textarea");
    if (!textarea) return;
    const field = document.createElement("div");
    field.className = "npati-video-comment-field";
    textarea.before(field);
    field.append(textarea);
    const trigger = document.createElement("span");
    trigger.className = "npati-video-emoji-trigger";
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-label", tr("Add emoji"));
    trigger.setAttribute("aria-expanded", "false");
    trigger.textContent = "😊";
    const picker = document.createElement("div");
    picker.className = "npati-video-emoji-picker";
    picker.hidden = true;
    picker.setAttribute("role", "dialog");
    picker.setAttribute("aria-label", tr("Choose emoji"));
    const render = (category) => {
      picker.innerHTML = `<div class="npati-video-emoji-tabs">${Object.entries(
        emojiCategories,
      )
        .map(
          ([key, value]) =>
            `<span role="button" tabindex="0" data-emoji-category="${key}" class="${key === category ? "is-active" : ""}" aria-label="${key}">${value.icon}</span>`,
        )
        .join(
          "",
        )}</div><div class="npati-video-emoji-grid">${emojiCategories[category].items.map((emoji) => `<span role="button" tabindex="0" data-emoji="${emoji}" aria-label="${emoji}">${emoji}</span>`).join("")}</div>`;
    };
    render("faces");
    field.append(trigger, picker);
    const toggle = () => {
      picker.hidden = !picker.hidden;
      trigger.setAttribute("aria-expanded", picker.hidden ? "false" : "true");
    };
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggle();
    });
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });
    const choose = (target) => {
      const category = target.closest?.("[data-emoji-category]");
      if (category) {
        render(category.dataset.emojiCategory);
        return;
      }
      const choice = target.closest?.("[data-emoji]");
      if (!choice) return;
      const emoji = choice.dataset.emoji,
        start = textarea.selectionStart ?? textarea.value.length,
        end = textarea.selectionEnd ?? start,
        next =
          textarea.value.slice(0, start) + emoji + textarea.value.slice(end),
        limit =
          Number(textarea.maxLength) > 0
            ? Number(textarea.maxLength)
            : next.length;
      textarea.value = next.slice(0, limit);
      const caret = Math.min(start + emoji.length, textarea.value.length);
      textarea.setSelectionRange(caret, caret);
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
      picker.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      textarea.focus();
    };
    picker.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      choose(event.target);
    });
    picker.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        choose(event.target);
      }
    });
    viewer?.addEventListener("click", (event) => {
      if (field.contains(event.target)) return;
      picker.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    });
  }
  function marketVideoAuthor(item) {
    return item.author && typeof item.author === "object" ? item.author : {};
  }
  function marketVideoCard(item) {
    const author = marketVideoAuthor(item),
      username = author.username || "",
      authorName = username
        ? `@${username}`
        : author.displayName ||
          [author.firstName, author.lastName].filter(Boolean).join(" ") ||
          "NPATI",
      avatar = author.avatar || "",
      initial = String(username || authorName || "N")
        .replace(/^@/, "")
        .charAt(0)
        .toUpperCase(),
      date = item.createdAt ? listingDate(item.createdAt) : "",
      profile = author.profileUrl || "",
      video = item.video || "",
      poster = item.thumbnail || "";
    const authorHtml = `${avatar ? `<img src="${esc(avatar)}" alt="">` : `<span>${esc(initial)}</span>`}<span><strong>${esc(authorName)}</strong>${date ? `<time datetime="${esc(item.createdAt)}">${esc(date)}</time>` : ""}</span>${author.isVerified ? '<i title="Verified">✓</i>' : ""}`;
    return `<article class="npati-market-video-card" data-action="open-market-video" data-video-id="${esc(item.id)}" tabindex="0" role="button" aria-label="${esc(item.title || "Open video")}"><div class="npati-market-video-media">${video ? `<video src="${esc(video)}"${poster ? ` poster="${esc(poster)}"` : ""} muted loop playsinline preload="metadata" aria-label="${esc(item.title || "Video")}"></video><button type="button" class="npati-market-video-sound" aria-label="Unmute"><svg class="is-muted" viewBox="0 0 24 24"><path d="M11 5 6.5 9H3v6h3.5l4.5 4V5Z"/><path d="m16 9 5 6M21 9l-5 6"/></svg><svg class="is-audible" viewBox="0 0 24 24"><path d="M11 5 6.5 9H3v6h3.5l4.5 4V5Z"/><path d="M15 9.5a4 4 0 0 1 0 5M18 7a7 7 0 0 1 0 10"/></svg></button><div class="npati-market-video-progress"><i></i></div>` : `<div class="npati-market-video-empty">▶</div>`}</div><div class="npati-market-video-body"><div class="npati-market-video-title"><h3>${esc(item.title || "Untitled video")}</h3><button type="button" aria-label="Open video">⋮</button></div>${item.description ? `<p>${esc(item.description)}</p>` : ""}<div class="npati-market-video-meta">${profile ? `<a class="npati-market-video-author" href="${esc(profile)}" target="_blank" rel="noopener">${authorHtml}</a>` : `<div class="npati-market-video-author">${authorHtml}</div>`}<span class="npati-market-video-views">${eyeIcon}${esc(compactNumber(item.viewsCount))}</span></div></div></article>`;
  }
  function shortCard(item) {
    const link =
        item.linkUrl ||
        `https://www.npati.com/${cfg.market === "US" ? "" : `${String(cfg.market).toLowerCase()}/`}s/${encodeURIComponent(item.id)}`,
      video = item.video || "",
      poster = item.thumbnail || "",
      date = listingDate(item.createdAt),
      media = video
        ? `<video src="${esc(video)}"${poster ? ` poster="${esc(poster)}"` : ""} muted loop playsinline preload="metadata" aria-label="${esc(item.title || "Short")}"></video>`
        : poster
          ? `<img src="${esc(poster)}" alt="${esc(item.title || "Short")}" loading="lazy" decoding="async">`
          : '<span class="npati-short-empty">▶</span>';
    return `<a class="npati-short-card" data-short-id="${esc(item.id)}" href="${esc(link)}" target="_blank" rel="noopener" aria-label="${esc(item.title || "Open Short on NPATI")}"><div class="npati-short-media">${media}<span class="npati-short-views">${eyeIcon}<b>${esc(compactNumber(item.viewsCount))}</b></span></div><div class="npati-short-footer">${date ? `<time datetime="${esc(item.createdAt)}">${esc(date)}</time>` : "<span></span>"}<span class="npati-short-dots" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="12" cy="19" r="1.7"/></svg></span></div></a>`;
  }
  function videoViewerMarkup(item) {
    const author = marketVideoAuthor(item),
      username = author.username || "",
      displayName =
        author.displayName ||
        [author.firstName, author.lastName].filter(Boolean).join(" ") ||
        username ||
        "NPATI",
      avatar = author.avatar || "",
      initial = String(username || displayName || "N")
        .charAt(0)
        .toUpperCase(),
      profile = author.profileUrl || "",
      commenter = activeProfile || author,
      commenterName = commenter.displayName || commenter.username || "NPATI",
      commenterAvatar = commenter.avatar || "",
      commenterInitial = String(commenter.username || commenterName || "N")
        .charAt(0)
        .toUpperCase(),
      commenterAvatarNode = commenterAvatar
        ? `<img src="${esc(commenterAvatar)}" alt="${esc(commenterName)}">`
        : `<span>${esc(commenterInitial)}</span>`;
    const avatarHtml = avatar
        ? `<img src="${esc(avatar)}" alt="">`
        : `<span>${esc(initial)}</span>`,
      avatarNode = profile
        ? `<a class="npati-video-viewer-avatar" href="${esc(profile)}" target="_blank" rel="noopener">${avatarHtml}</a>`
        : `<div class="npati-video-viewer-avatar">${avatarHtml}</div>`,
      nameNode = profile
        ? `<a class="npati-video-viewer-name" href="${esc(profile)}" target="_blank" rel="noopener">${esc(displayName)}</a>`
        : `<strong class="npati-video-viewer-name">${esc(displayName)}</strong>`,
      usernameNode = profile
        ? `<a class="npati-video-viewer-username" href="${esc(profile)}" target="_blank" rel="noopener">@${esc(username)}</a>`
        : `<small class="npati-video-viewer-username">@${esc(username)}</small>`;
    return `<div class="npati-video-viewer" data-action="close-video-viewer" role="dialog" aria-modal="true" aria-label="${esc(item.title || "Video")}"><div class="npati-video-viewer-dialog"><button type="button" class="npati-video-viewer-close" data-action="close-video-viewer" aria-label="Close video"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button><section class="npati-video-viewer-player"><video src="${esc(item.video || "")}"${item.thumbnail ? ` poster="${esc(item.thumbnail)}"` : ""} autoplay playsinline preload="metadata"></video>${item.title ? `<h2>${esc(item.title)}</h2>` : ""}<div class="npati-viewer-player-controls"><div class="npati-viewer-progress" data-viewer-progress role="slider" aria-label="Video progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span data-viewer-buffered></span><i data-viewer-played><b></b></i></div><div class="npati-viewer-control-row"><div><button type="button" data-viewer-play aria-label="Pause"><svg class="is-play" viewBox="0 0 24 24"><path d="m8 5 11 7-11 7Z"/></svg><svg class="is-pause" viewBox="0 0 24 24"><path d="M7 5h4v14H7zM14 5h4v14h-4z"/></svg></button><button type="button" data-viewer-sound aria-label="Mute"><svg class="is-muted" viewBox="0 0 24 24"><path d="M11 5 6.5 9H3v6h3.5l4.5 4V5Z"/><path d="m16 9 5 6M21 9l-5 6"/></svg><svg class="is-audible" viewBox="0 0 24 24"><path d="M11 5 6.5 9H3v6h3.5l4.5 4V5Z"/><path d="M15 9.5a4 4 0 0 1 0 5M18 7a7 7 0 0 1 0 10"/></svg></button><span class="npati-viewer-time"><time data-viewer-current>0:00</time> / <time data-viewer-duration>0:00</time></span></div><button type="button" data-viewer-fullscreen aria-label="Fullscreen"><svg viewBox="0 0 24 24"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/></svg></button></div></div></section><aside class="npati-video-viewer-sidebar" data-video-id="${esc(item.id)}"><header><div class="npati-video-viewer-author">${avatarNode}<div><div>${nameNode}${author.isVerified ? '<i title="Verified">✓</i>' : ""}</div>${usernameNode}</div></div></header>${item.description ? `<div class="npati-video-viewer-description"><p>${esc(item.description)}</p></div>` : ""}<div class="npati-video-viewer-actions"><button type="button" data-video-interaction="like" aria-label="Like">${heartIcon}<b data-video-count="likes">${esc(compactNumber(item.likesCount))}</b></button><button type="button" data-video-interaction="comments" aria-label="Comments">${commentIcon}<b data-video-count="comments">${esc(compactNumber(item.commentsCount))}</b></button><button type="button" data-video-interaction="share" aria-label="Share">${shareIcon}<b data-video-count="reposts">${esc(compactNumber(item.repostsCount))}</b></button><button type="button" data-video-interaction="save" aria-label="Save">${bookmarkIcon}<b data-video-count="saves">${esc(compactNumber(item.savesCount))}</b></button></div><div class="npati-video-viewer-comments"><div class="npati-video-viewer-comment-list"><div class="npati-video-comments-loading">${esc(tr("Loading comments…"))}</div></div></div><form class="npati-video-comment-form"><div class="npati-video-comment-composer-avatar">${commenterAvatarNode}</div><textarea name="comment" maxlength="5000" rows="1" placeholder="${esc(tr("Add a comment…"))}" required></textarea><button type="submit" aria-label="${esc(tr("Send comment"))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></svg></button></form></aside></div></div>`;
  }
  function findMarketVideo(id) {
    return Object.values(state.marketContent)
      .flat()
      .find((item) => item.type === "video" && String(item.id) === String(id));
  }
  function videoCommentMarkup(comment, isReply = false) {
    const author = comment.author || comment.user || {},
      username = String(author.username || "").replace(/^@/, ""),
      name =
        author.displayName ||
        author.display_name ||
        [
          author.firstName || author.first_name,
          author.lastName || author.last_name,
        ]
          .filter(Boolean)
          .join(" ") ||
        username ||
        "NPATI",
      avatar = author.avatar || author.avatarUrl || author.avatar_url || "",
      initial = String(username || name || "N")
        .charAt(0)
        .toUpperCase(),
      content = comment.comment || comment.content || "",
      created =
        comment.dateCreated ||
        comment.date_created ||
        comment.createdAt ||
        comment.created_at ||
        comment.createdOn ||
        comment.created_on ||
        "",
      likes = comment.likesCount ?? comment.likes_count ?? 0,
      id = comment.id || "",
      replies = Array.isArray(comment.replies) ? comment.replies : [],
      profile = username
        ? `https://www.npati.com/${cfg.market === "US" ? "" : `${String(cfg.market).toLowerCase()}/`}@${encodeURIComponent(username)}`
        : "",
      avatarHtml = avatar
        ? `<img src="${esc(avatar)}" alt="${esc(name)}">`
        : `<span>${esc(initial)}</span>`,
      avatarNode = profile
        ? `<a class="npati-video-comment-avatar" href="${esc(profile)}" target="_blank" rel="noopener">${avatarHtml}</a>`
        : `<div class="npati-video-comment-avatar">${avatarHtml}</div>`,
      liked = Boolean(comment.isLiked ?? comment.is_liked);
    return `<article class="npati-video-comment${isReply ? " is-reply" : ""}" data-comment-id="${esc(id)}">${avatarNode}<div class="npati-video-comment-body"><div class="npati-video-comment-head"><strong>${esc(name)}</strong>${created ? `<time datetime="${esc(created)}">${esc(listingDate(created))}</time>` : ""}</div><p>${esc(content)}</p>${isReply ? "" : `<div class="npati-video-comment-actions"><button type="button" data-comment-reply>${esc(tr("Reply"))}</button></div><div class="npati-video-reply-slot"></div>${replies.length ? `<div class="npati-video-replies">${replies.map((reply) => videoCommentMarkup(reply, true)).join("")}</div>` : ""}`}</div><button type="button" data-comment-like aria-label="Like comment" aria-pressed="${liked ? "true" : "false"}" class="npati-video-comment-like${liked ? " is-active" : ""}">${heartIcon}<b>${esc(compactNumber(likes))}</b></button></article>`;
  }
  function renderVideoComments(viewer, comments) {
    const list = viewer.querySelector(".npati-video-viewer-comment-list");
    if (!list) return;
    list.innerHTML = comments.length
      ? comments.map(videoCommentMarkup).join("")
      : `<div class="npati-video-comments-empty"><strong>${esc(tr("No comments yet"))}</strong><p>${esc(tr("Be the first to comment."))}</p></div>`;
  }
  function updateVideoViewerStats(viewer, stats = {}) {
    const counters = stats.counters || stats.counts || stats,
      userState = stats.userState || stats;
    [
      ["likes", "likes"],
      ["comments", "comments"],
      ["reposts", "reposts"],
      ["saves", "saves"],
    ].forEach(([key, field]) => {
      const node = viewer.querySelector(`[data-video-count="${key}"]`);
      if (node && counters[field] !== undefined)
        node.textContent = compactNumber(counters[field]);
    });
    const liked =
        userState.isLiked ??
        (stats.action === "liked"
          ? true
          : stats.action === "unliked"
            ? false
            : undefined),
      saved =
        userState.isSaved ??
        (stats.action === "saved"
          ? true
          : stats.action === "unsaved"
            ? false
            : undefined);
    if (liked !== undefined)
      viewer
        .querySelector('[data-video-interaction="like"]')
        ?.classList.toggle("is-active", Boolean(liked));
    if (saved !== undefined)
      viewer
        .querySelector('[data-video-interaction="save"]')
        ?.classList.toggle("is-active", Boolean(saved));
  }
  function bindViewerPlayer(viewer) {
    const player = viewer.querySelector(".npati-video-viewer-player"),
      video = player?.querySelector("video"),
      controls = player?.querySelector(".npati-viewer-player-controls"),
      progress = player?.querySelector("[data-viewer-progress]"),
      played = player?.querySelector("[data-viewer-played]"),
      buffered = player?.querySelector("[data-viewer-buffered]"),
      playButton = player?.querySelector("[data-viewer-play]"),
      soundButton = player?.querySelector("[data-viewer-sound]"),
      current = player?.querySelector("[data-viewer-current]"),
      duration = player?.querySelector("[data-viewer-duration]");
    if (!player || !video || !controls || !progress) return;
    let idleTimer;
    const clock = (value) => {
      const seconds = Number.isFinite(value)
        ? Math.max(0, Math.floor(value))
        : 0;
      return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
    };
    const showControls = () => {
      player.classList.remove("is-controls-hidden");
      clearTimeout(idleTimer);
      if (!video.paused)
        idleTimer = setTimeout(
          () => player.classList.add("is-controls-hidden"),
          2200,
        );
    };
    const sync = () => {
      const total = Number.isFinite(video.duration) ? video.duration : 0,
        percent = total
          ? Math.min(100, Math.max(0, (video.currentTime / total) * 100))
          : 0;
      if (played) played.style.width = `${percent}%`;
      if (current) current.textContent = clock(video.currentTime);
      if (duration) duration.textContent = clock(total);
      progress.setAttribute("aria-valuenow", String(Math.round(percent)));
      player.classList.toggle("is-playing", !video.paused);
      playButton?.setAttribute("aria-label", video.paused ? "Play" : "Pause");
      if (video.paused) player.classList.remove("is-controls-hidden");
    };
    const syncBuffer = () => {
      if (!buffered) return;
      let end = 0;
      try {
        if (video.buffered.length)
          end = video.buffered.end(video.buffered.length - 1);
      } catch {}
      buffered.style.width = `${video.duration ? Math.min(100, (end / video.duration) * 100) : 0}%`;
    };
    const togglePlay = () =>
      video.paused ? video.play().catch(() => {}) : video.pause();
    const toggleFullscreen = () => {
      if (document.fullscreenElement) document.exitFullscreen?.();
      else player.requestFullscreen?.();
    };
    playButton?.addEventListener("click", togglePlay);
    video.addEventListener("click", togglePlay);
    soundButton?.addEventListener("click", () => {
      video.muted = !video.muted;
      soundButton.classList.toggle("is-muted", video.muted);
      soundButton.setAttribute("aria-label", video.muted ? "Unmute" : "Mute");
    });
    player
      .querySelector("[data-viewer-fullscreen]")
      ?.addEventListener("click", toggleFullscreen);
    player.addEventListener("dblclick", toggleFullscreen);
    player.addEventListener("mousemove", showControls);
    player.addEventListener("mouseleave", () => {
      if (!video.paused) player.classList.add("is-controls-hidden");
    });
    progress.addEventListener("click", (event) => {
      const rect = progress.getBoundingClientRect();
      if (video.duration && rect.width)
        video.currentTime = Math.max(
          0,
          Math.min(
            video.duration,
            ((event.clientX - rect.left) / rect.width) * video.duration,
          ),
        );
      sync();
    });
    [
      "loadedmetadata",
      "durationchange",
      "timeupdate",
      "play",
      "pause",
      "ended",
    ].forEach((name) => video.addEventListener(name, sync));
    ["progress", "loadedmetadata"].forEach((name) =>
      video.addEventListener(name, syncBuffer),
    );
    video.muted = false;
    soundButton?.classList.remove("is-muted");
    sync();
    syncBuffer();
    showControls();
  }
  async function refreshVideoViewer(viewer, id) {
    try {
      const data = await api(`market/videos/${encodeURIComponent(id)}/viewer`);
      if (!viewer.isConnected) return;
      updateVideoViewerStats(viewer, data.stats || {});
      renderVideoComments(
        viewer,
        Array.isArray(data.comments) ? data.comments : [],
      );
    } catch (error) {
      const list = viewer.querySelector(".npati-video-viewer-comment-list");
      if (list)
        list.innerHTML = `<div class="npati-video-comments-empty"><strong>${esc(tr("Comments could not be loaded."))}</strong><button type="button" data-comments-retry>${esc(tr("Try again"))}</button></div>`;
    }
  }
  function bindVideoViewer(viewer, item) {
    const id = item.id,
      mainForm = viewer.querySelector(".npati-video-comment-form");
    viewer.querySelectorAll("[data-video-interaction]").forEach((button) =>
      button.addEventListener("click", async (event) => {
        event.preventDefault();
        const action = button.dataset.videoInteraction;
        if (action === "comments") {
          mainForm?.querySelector("textarea")?.focus();
          return;
        }
        button.disabled = true;
        try {
          if (action === "share") {
            const url = item.linkUrl || location.href;
            if (navigator.share)
              await navigator.share({
                title: item.title || "NPATI video",
                url,
              });
            else await navigator.clipboard?.writeText(url);
          }
          const result = await api(
            `market/videos/${encodeURIComponent(id)}/action`,
            { method: "POST", data: { action } },
          );
          updateVideoViewerStats(viewer, result);
        } catch (error) {
          if (error?.name !== "AbortError")
            alert(error.message || tr("Action failed"));
        } finally {
          button.disabled = false;
        }
      }),
    );
    mainForm?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget,
        textarea = form.elements.comment,
        button = form.querySelector("button");
      if (!textarea.value.trim()) return;
      button.disabled = true;
      try {
        await api(`market/videos/${encodeURIComponent(id)}/comments`, {
          method: "POST",
          data: { comment: textarea.value.trim() },
        });
        textarea.value = "";
        await refreshVideoViewer(viewer, id);
      } catch (error) {
        alert(error.message || tr("Action failed"));
      } finally {
        button.disabled = false;
      }
    });
    viewer
      .querySelector(".npati-video-viewer-comment-list")
      ?.addEventListener("click", async (event) => {
        const retry = event.target.closest("[data-comments-retry]");
        if (retry) {
          refreshVideoViewer(viewer, id);
          return;
        }
        const replyButton = event.target.closest("[data-comment-reply]");
        if (replyButton) {
          const comment = replyButton.closest("[data-comment-id]"),
            slot = comment.querySelector(".npati-video-reply-slot");
          viewer
            .querySelectorAll(".npati-video-reply-form")
            .forEach((form) => form.remove());
          slot.innerHTML = `<form class="npati-video-reply-form"><textarea name="reply" maxlength="5000" rows="1" placeholder="${esc(tr("Write a reply…"))}" required></textarea><button type="submit" aria-label="${esc(tr("Send reply"))}">${shareIcon}</button><button type="button" data-cancel-reply aria-label="${esc(tr("Cancel"))}"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></form>`;
          slot.querySelector("textarea")?.focus();
          return;
        }
        const cancel = event.target.closest("[data-cancel-reply]");
        if (cancel) {
          cancel.closest("form")?.remove();
          return;
        }
        const likeButton = event.target.closest("[data-comment-like]");
        if (!likeButton) return;
        const comment = likeButton.closest("[data-comment-id]");
        likeButton.disabled = true;
        try {
          const response = await api(
              `market/videos/${encodeURIComponent(id)}/comments/${encodeURIComponent(comment.dataset.commentId)}/like`,
              { method: "POST" },
            ),
            result = response?.data || response,
            isLiked = Boolean(result.isLiked ?? result.is_liked);
          likeButton.classList.toggle("is-active", isLiked);
          likeButton.setAttribute("aria-pressed", isLiked ? "true" : "false");
          const count = likeButton.querySelector("b");
          if (count)
            count.textContent = compactNumber(
              result.likesCount ?? result.likes_count ?? 0,
            );
        } catch (error) {
          alert(error.message || tr("Action failed"));
        } finally {
          likeButton.disabled = false;
        }
      });
    viewer
      .querySelector(".npati-video-viewer-comment-list")
      ?.addEventListener("submit", async (event) => {
        const form = event.target.closest(".npati-video-reply-form");
        if (!form) return;
        event.preventDefault();
        const parent = form.closest("[data-comment-id]"),
          textarea = form.elements.reply,
          buttons = form.querySelectorAll("button");
        if (!textarea.value.trim()) return;
        buttons.forEach((button) => (button.disabled = true));
        try {
          await api(`market/videos/${encodeURIComponent(id)}/comments`, {
            method: "POST",
            data: {
              comment: textarea.value.trim(),
              parentId: parent.dataset.commentId,
            },
          });
          await refreshVideoViewer(viewer, id);
        } catch (error) {
          alert(error.message || tr("Action failed"));
          buttons.forEach((button) => (button.disabled = false));
        }
      });
    refreshVideoViewer(viewer, id);
  }
  document.addEventListener("click", (event) => {
    if (!event.target.closest?.("[data-comment-reply]")) return;
    queueMicrotask(() => {
      const button = document.querySelector(
        '.npati-video-reply-form [type="submit"]',
      );
      if (button) button.innerHTML = sendIcon;
    });
  });
  function openMarketVideo(id) {
    const item = findMarketVideo(id);
    if (!item || !item.video) return;
    closeMarketVideo();
    root.querySelectorAll("video").forEach((video) => video.pause());
    root.insertAdjacentHTML("beforeend", videoViewerMarkup(item));
    document.body.classList.add("npati-video-viewer-open");
    const viewer = root.querySelector(".npati-video-viewer"),
      video = viewer?.querySelector(".npati-video-viewer-player video");
    if (viewer) {
      bindViewerPlayer(viewer);
      bindVideoViewer(viewer, item);
      enhanceCommentComposer(
        viewer.querySelector(".npati-video-comment-form"),
        viewer,
      );
    }
    video?.play().catch(() => {});
    viewer?.querySelector(".npati-video-viewer-close")?.focus();
  }
  function closeMarketVideo() {
    const viewer = document.querySelector(".npati-video-viewer");
    if (!viewer) return;
    viewer.querySelector("video")?.pause();
    viewer.remove();
    document.body.classList.remove("npati-video-viewer-open");
  }
  function changeListingSlide(card, nextIndex) {
    const slides = [...card.querySelectorAll(".npati-listing-slide")];
    if (!slides.length) return;
    const index = (Number(nextIndex) + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
      if (slide.tagName === "VIDEO") {
        if (i !== index) slide.pause();
        else if (card.matches(":hover")) playListingVideo(slide);
      }
    });
    card
      .querySelectorAll("[data-video-ui]")
      .forEach((ui) =>
        ui.classList.toggle("is-active", Number(ui.dataset.slide) === index),
      );
    card
      .querySelectorAll(".npati-listing-dots button")
      .forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    card.dataset.currentSlide = String(index);
  }
  function playListingVideo(video) {
    if (!video) return;
    root
      .querySelectorAll(
        ".npati-listing-card video,.npati-market-video-card video",
      )
      .forEach((other) => {
        if (other !== video && !other.paused) other.pause();
      });
    video.play().catch(() => {});
  }
  function bindListingPlayers() {
    root.querySelectorAll(".npati-listing-card").forEach((card) => {
      if (card.dataset.playerBound) return;
      card.dataset.playerBound = "1";
      const activeVideo = () =>
        card.querySelector("video.npati-listing-slide.is-active");
      card.addEventListener("mouseenter", () =>
        playListingVideo(activeVideo()),
      );
      card.addEventListener("mouseleave", () => activeVideo()?.pause());
      card.querySelectorAll("video").forEach((video) => {
        const ui = card.querySelector(
            `[data-video-ui][data-slide="${video.dataset.slide}"]`,
          ),
          progress = ui?.querySelector(".npati-video-progress i"),
          play = ui?.querySelector(".npati-video-play");
        const sync = () => {
          if (progress)
            progress.style.width = `${video.duration ? (video.currentTime / video.duration) * 100 : 0}%`;
          ui?.classList.toggle("is-playing", !video.paused);
          if (play)
            play.setAttribute(
              "aria-label",
              video.paused ? "Play video" : "Pause video",
            );
        };
        video.addEventListener("timeupdate", sync);
        video.addEventListener("play", sync);
        video.addEventListener("pause", sync);
        video.addEventListener("ended", sync);
      });
    });
  }
  function bindMarketVideoPlayers() {
    root.querySelectorAll(".npati-market-video-card").forEach((card) => {
      if (card.dataset.playerBound) return;
      card.dataset.playerBound = "1";
      const video = card.querySelector("video"),
        progress = card.querySelector(".npati-market-video-progress i"),
        sound = card.querySelector(".npati-market-video-sound");
      if (!video) return;
      const sync = () => {
        card.classList.toggle("is-playing", !video.paused);
        if (progress)
          progress.style.width = `${video.duration ? (video.currentTime / video.duration) * 100 : 0}%`;
      };
      card.addEventListener("mouseenter", () => playListingVideo(video));
      card.addEventListener("mouseleave", () => video.pause());
      video.addEventListener("timeupdate", sync);
      video.addEventListener("play", sync);
      video.addEventListener("pause", sync);
      sound?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        video.muted = !video.muted;
        sound.classList.toggle("is-audible", !video.muted);
        sound.setAttribute("aria-label", video.muted ? "Unmute" : "Mute");
      });
    });
  }
  function bindShortPlayers() {
    root.querySelectorAll(".npati-short-card").forEach((card) => {
      if (card.dataset.playerBound) return;
      card.dataset.playerBound = "1";
      const video = card.querySelector("video");
      if (!video) return;
      card.addEventListener("mouseenter", () => playListingVideo(video));
      card.addEventListener("mouseleave", () => video.pause());
    });
  }
  async function toggleListingLike(button) {
    if (button.disabled) return;
    const card = button.closest(".npati-listing-card"),
      id = card?.dataset.listingId;
    if (!id) return;
    button.disabled = true;
    button.classList.add("is-animating");
    try {
      const response = await api(
          `market/listings/${encodeURIComponent(id)}/like`,
          { method: "POST" },
        ),
        result = response?.data || response,
        isLiked = Boolean(result?.isLiked),
        likesCount = Number(result?.likesCount) || 0;
      button.classList.toggle("is-liked", isLiked);
      button.setAttribute("aria-pressed", isLiked ? "true" : "false");
      button.querySelector("span").textContent = compactNumber(likesCount);
      Object.values(state.marketContent).forEach((items) =>
        items.forEach((item) => {
          if (String(item.id) === String(id)) {
            item.isLiked = isLiked;
            item.likesCount = likesCount;
          }
        }),
      );
      state.listings.forEach((item) => {
        if (String(item.id) === String(id)) {
          item.isLiked = isLiked;
          item.likesCount = likesCount;
        }
      });
    } catch (error) {
      alert(error?.message || tr("Action failed"));
    } finally {
      button.disabled = false;
      setTimeout(() => button.classList.remove("is-animating"), 260);
    }
  }
  async function loadMarketStatus(status, force = false) {
    if (state.marketLoaded[status] && !force) {
      market();
      return;
    }
    state.marketLoading = status;
    state.marketErrors[status] = null;
    market();
    try {
      if (status === "listings") {
        const results = await Promise.all([
          api("market/listings"),
          api("market/listings?status=pending"),
          api("market/listings?status=rejected"),
        ]);
        state.marketContent.active = normalizeMarketItems(results[0], "active");
        state.marketContent.pending = normalizeMarketItems(
          results[1],
          "pending",
        );
        state.marketContent.rejected = normalizeMarketItems(
          results[2],
          "rejected",
        );
        state.listings = mergeListingStatuses(
          state.marketContent.active,
          state.marketContent.pending,
          state.marketContent.rejected,
        );
        state.marketContent.listings = state.listings;
        state.marketLoaded.active = true;
        state.marketLoaded.pending = true;
        state.marketLoaded.rejected = true;
        state.marketLoaded.listings = true;
        saveWorkspaceCache();
      } else {
        const value = await api(
            `market/listings?status=${encodeURIComponent(status)}`,
          ),
          items = normalizeMarketItems(value, status);
        state.marketContent[status] = items;
        state.marketLoaded[status] = true;
      }
    } catch (error) {
      state.marketErrors[status] = error;
      state.marketLoaded[status] = false;
    } finally {
      state.marketLoading = false;
      market();
    }
  }
  function market() {
    const selected = marketTabs[state.marketTab] || marketTabs.listings,
      status = selected.status,
      all = state.marketContent[status] || [],
      items = selected.type
        ? all.filter((item) => item.type === selected.type)
        : all,
      error = state.marketErrors[status],
      loading = state.marketLoading === status;
    const tabs = Object.entries(marketTabs)
      .map(
        ([key, tab]) =>
          `<button type="button" data-market-tab="${key}" class="${key === state.marketTab ? "active" : ""}" aria-pressed="${key === state.marketTab ? "true" : "false"}">${tab.label}</button>`,
      )
      .join("");
    const cardRenderer =
        selected.type === "video"
          ? marketVideoCard
          : selected.type === "short"
            ? shortCard
            : listingCard,
      cards = items.map(cardRenderer).join("");
    const gridClass =
      selected.type === "video"
        ? "npati-video-grid"
        : selected.type === "short"
          ? "npati-shorts-grid"
          : "npati-listing-grid";
    const content = loading
      ? '<div class="npati-skeleton"><i></i><i></i><i></i></div>'
      : error
        ? `<div class="npati-error" role="alert"><strong>Market data could not be loaded.</strong><p>${esc(error.message || "NPATI Market is temporarily unavailable.")}</p><button class="npati-secondary-button" data-action="market-retry">Try again</button></div>`
        : items.length
          ? `<div class="${gridClass}">${cards}</div>`
          : empty(
              `No ${selected.label.toLowerCase()}`,
              "Nothing has been published in this section yet.",
            );
    closeVerificationTooltip();
    root.innerHTML = `<section class="npati-page-heading npati-market-heading"><div><h1>Your marketplace content</h1><p>Listings, videos and shorts from your connected NPATI account.</p></div><button class="npati-primary-button" data-route="market/create">+ Create listing</button></section><div class="npati-market-tabs" role="tablist">${tabs}</div>${content}`;
    enhanceListingActionMenus();
    bindListingPlayers();
    bindListingVerificationBadges();
    bindMarketVideoPlayers();
    bindShortPlayers();
  }
  const listingText = (en, ukText) => (uiLanguage === "uk" ? ukText : en);
  const listingImageSquareIcon = () =>
    '<svg class="npati-upload-icon" viewBox="0 0 256 256" aria-hidden="true"><path d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16ZM48 48h160v77.38l-24.69-24.7a16 16 0 0 0-22.62 0L53.37 208H48Zm32 48a16 16 0 1 1 16 16 16 16 0 0 1-16-16Z"/></svg>';
  const listingImageIcon = () =>
    '<svg class="npati-upload-icon" viewBox="0 0 256 256" aria-hidden="true"><path d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm-60 48a12 12 0 1 1-12 12 12 12 0 0 1 12-12Zm60 112H40v-39.31l46.34-46.35a8 8 0 0 1 11.32 0L165 181.66a8 8 0 0 0 11.32-11.32l-17.66-17.65L173 138.34a8 8 0 0 1 11.31 0L216 170.07Z"/></svg>';
  const listingFilmIcon = () =>
    '<svg class="npati-upload-icon" viewBox="0 0 256 256" aria-hidden="true"><path d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm-32 16h32v16h-32ZM72 200H40v-16h32Zm0-128H40V56h32Zm48 128H88v-16h32Zm0-128H88V56h32Zm48 128h-32v-16h32Zm0-128h-32V56h32Zm48 128h-32v-16h32Z"/></svg>';
  const listingAddressLabel = (address) =>
    [
      address.fullName ||
        address.full_name ||
        [
          address.firstName || address.first_name,
          address.lastName || address.last_name,
        ]
          .filter(Boolean)
          .join(" ") ||
        address.name,
      [address.city, address.state].filter(Boolean).join(", "),
      address.addressType || address.address_type || address.type
        ? `(${address.addressType || address.address_type || address.type})`
        : null,
    ]
      .filter(Boolean)
      .join(" - ")
      .replace(" - (", " (");
  const listingAddressLocation = (address) =>
    [address.city, address.state, address.zip].filter(Boolean).join(", ");
  const listingAddressIsDefault = (address) =>
    Boolean(address.isDefault ?? address.is_default);
  const listingAddressCountry = (address) => {
    const value = String(
      address.countryCode || address.country_code || address.country || "",
    )
      .trim()
      .toUpperCase();
    return (
      {
        UKRAINE: "UA",
        UKR: "UA",
        UA: "UA",
        "UNITED STATES": "US",
        "UNITED STATES OF AMERICA": "US",
        USA: "US",
        US: "US",
        CANADA: "CA",
        CAN: "CA",
        CA: "CA",
        "UNITED KINGDOM": "GB",
        "GREAT BRITAIN": "GB",
        UK: "GB",
        GBR: "GB",
        GB: "GB",
      }[value] || value
    );
  };
  const listingMarketAddresses = (items) => {
    const market = String(cfg.market || "US").toUpperCase(),
      source = Array.isArray(items) ? items : [];
    return source
      .filter(
        (address) =>
          !listingAddressCountry(address) ||
          listingAddressCountry(address) === market,
      )
      .sort(
        (a, b) =>
          Number(listingAddressIsDefault(b)) -
          Number(listingAddressIsDefault(a)),
      );
  };
  function listingAddressOptions(addresses) {
    return `<option value="">${esc(listingText("Select address", "Виберіть адресу"))}</option>${addresses.map((address) => `<option value="${esc(address.id)}" data-location="${esc(listingAddressLocation(address))}" data-phone="${esc(address.phone || "")}" data-email="${esc(address.email || "")}"${listingAddressIsDefault(address) ? ' data-default="1"' : ""}>${esc(listingAddressLabel(address))}</option>`).join("")}<option value="__add_address__">＋ ${esc(listingText("Add new address", "Додати нову адресу"))}</option>`;
  }
  function listingAddressModal() {
    const market = String(cfg.market || "US").toUpperCase(),
      ua = market === "UA",
      region =
        { US: "State", CA: "Province / Territory", GB: "Country / Region" }[
          market
        ] || "Region",
      postal =
        {
          US: "ZIP Code",
          CA: "Postal Code",
          GB: "Postcode",
          UA: "Поштовий індекс",
        }[market] || "Postal code";
    return `<div class="npati-address-modal" data-address-modal hidden><section class="npati-address-dialog${ua ? " is-ua" : ""}" role="dialog" aria-modal="true" aria-labelledby="npati-address-title"><header><div><h2 id="npati-address-title">${esc(listingText("Add new address", "Додати нову адресу"))}</h2><p>${esc(listingText("Fill out your shipping details. The address will appear in your list immediately.", "Заповніть деталі доставки. Адреса з’явиться у вашому списку відразу."))}</p></div><button type="button" data-action="close-address-modal" aria-label="${esc(listingText("Close", "Закрити"))}">${closeIcon}</button></header><div class="npati-address-fields">
      ${ua ? "" : `<label>${esc(listingText("Address type", "Тип адреси"))}<select name="addressType"><option value="home">${esc(listingText("Home", "Дім"))}</option><option value="work">${esc(listingText("Work", "Робота"))}</option><option value="other">${esc(listingText("Other", "Інше"))}</option></select></label>`}
      <label>${esc(listingText("First name", "Ім’я"))} *<input name="addressFirstName" required autocomplete="given-name"></label><label>${esc(listingText("Last name", "Прізвище"))} *<input name="addressLastName" required autocomplete="family-name"></label><label>${esc(listingText("Phone", "Телефон"))} *<input name="addressPhone" required type="tel" autocomplete="tel" placeholder="${ua ? "+380 67 123 45 67" : market === "GB" ? "+44 7700 900 123" : "+1 (555) 123-4567"}"></label>
      ${ua ? `<label>${esc(listingText("Company", "Компанія"))}<input name="addressCompany" autocomplete="organization"></label><label>${esc(listingText("Email", "Електронна пошта"))}<input name="addressEmail" type="email" autocomplete="email"></label><label class="npati-address-city-field">${esc("Місто")} *<span class="npati-address-search"><input name="addressCitySearch" autocomplete="off" placeholder="Введіть місто"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg></span><select name="addressCity" hidden></select><div class="npati-address-city-results" hidden></div><span class="npati-address-city-selected" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg><strong></strong><button type="button" data-action="change-address-city">(змінити)</button></span></label><label class="npati-address-warehouse-field" hidden>${esc("Відділення Nova Poshta")} *<select name="addressWarehouse" disabled><option value="">Виберіть відділення</option></select><span class="npati-address-warehouse-details" hidden></span></label>` : `<label class="npati-address-wide">${esc(listingText("Street address", "Адреса"))} *<input name="addressStreet1" required autocomplete="address-line1"></label><label class="npati-address-wide">${esc(listingText("Apartment, suite, etc.", "Квартира, офіс тощо"))}<input name="addressStreet2" autocomplete="address-line2"></label><label>${esc(region)} *<input name="addressState" required></label><label>${esc(listingText("City", "Місто"))} *<input name="addressCityManual" required autocomplete="address-level2"></label>`}
      <label class="npati-address-postal">${esc(postal)} *<input name="addressZip" required autocomplete="postal-code" maxlength="8" inputmode="numeric" placeholder="${ua ? "01001" : ""}"><small data-address-postal-status>${ua ? "Введіть 5-значний поштовий індекс." : ""}</small></label><div class="npati-address-checks">${ua ? '<label class="npati-address-check"><input type="checkbox" name="addressResidential" checked><i aria-hidden="true"></i><span>Житлова адреса</span></label>' : ""}<label class="npati-address-check"><input type="checkbox" name="addressDefault"><i aria-hidden="true"></i><span>${esc(listingText("Set as default address", "Встановити як адресу за замовчуванням"))}</span></label></div>
    </div><p class="npati-address-error" role="alert"></p><footer><button type="button" class="npati-secondary-button" data-action="close-address-modal">${esc(listingText("Cancel", "Скасувати"))}</button><button type="button" class="npati-primary-button" data-action="save-address">${esc(listingText("Save address", "Зберегти адресу"))}</button></footer></section></div>`;
  }
  function listingCategoryTree(items) {
    const source = Array.isArray(items) ? items : [],
      hasNested = source.some(
        (item) =>
          Array.isArray(item.subcategories) && item.subcategories.length,
      );
    if (hasNested)
      return source.filter(
        (item) => item.name !== "All" && item.slug !== "all",
      );
    const map = new Map(
        source
          .filter((item) => item.name !== "All" && item.slug !== "all")
          .map((item) => [String(item.id), { ...item, subcategories: [] }]),
      ),
      roots = [];
    for (const item of map.values()) {
      const parent =
        item.parentCategory ||
        item.parent_category ||
        item.parentId ||
        item.parent_id;
      if (parent && map.has(String(parent)))
        map.get(String(parent)).subcategories.push(item);
      else roots.push(item);
    }
    return roots;
  }
  function listingCategorySelector(tree) {
    return `<div class="npati-category-picker"><input type="hidden" name="categoryId" required><button type="button" class="npati-category-control" data-action="toggle-category-picker" aria-expanded="false"><span>${esc(listingText("Select category", "Виберіть категорію"))}</span><svg viewBox="0 0 256 256"><path d="m208.49 96.49-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L120 151l71.51-71.51a12 12 0 0 1 17 17Z"/></svg></button><button type="button" class="npati-category-clear" data-action="clear-listing-category" aria-label="${esc(listingText("Clear category", "Скинути категорію"))}" title="${esc(listingText("Clear category", "Скинути категорію"))}" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button><div class="npati-category-menu" hidden>${
      tree.length
        ? tree
            .map((main) => {
              const children = main.subcategories || [];
              return `<div class="npati-category-group"><div class="npati-category-option is-main" data-action="select-listing-category" data-id="${esc(main.id)}" data-label="${esc(main.name)}">${children.length ? `<button type="button" data-action="toggle-category-group" aria-label="Expand"><svg viewBox="0 0 256 256"><path d="m96 48 80 80-80 80"/></svg></button>` : "<i></i>"}<span>${esc(main.name)}</span><b>✓</b></div>${children.length ? `<div class="npati-category-children" hidden>${children.map((child) => `<div class="npati-category-option" data-action="select-listing-category" data-id="${esc(child.id)}" data-label="${esc(child.name)}"><i></i><span>${esc(child.name)}</span><b>✓</b></div>`).join("")}</div>` : ""}</div>`;
            })
            .join("")
        : `<p>${esc(listingText("No categories available", "Немає доступних категорій"))}</p>`
    }</div></div>`;
  }
  function listingMediaByRole(role) {
    return state.listingMedia.filter(
      (item) =>
        (item.role ||
          (String(item.mimeType || "").startsWith("video/")
            ? "video"
            : "photo")) === role,
    );
  }
  function revokeListingPreview(item) {
    const url = item?.previewUrl;
    if (item?.generatedPreview && url?.startsWith("blob:"))
      URL.revokeObjectURL(url);
  }
  function generateListingVideoThumbnail(sourceUrl, seekTime = 0.1) {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video"),
        timeout = setTimeout(
          () => finish(null, new Error("Thumbnail generation timeout")),
          12000,
        );
      let settled = false;
      const finish = (blob, error) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        video.removeAttribute("src");
        video.load();
        if (error) reject(error);
        else resolve(blob);
      };
      const capture = () => {
        try {
          if (!video.videoWidth || !video.videoHeight)
            throw new Error("Video dimensions are unavailable");
          const scale = Math.min(
              1,
              800 / video.videoWidth,
              608 / video.videoHeight,
            ),
            canvas = document.createElement("canvas"),
            context = canvas.getContext("2d");
          if (!context) throw new Error("Canvas is unavailable");
          canvas.width = Math.max(1, Math.round(video.videoWidth * scale));
          canvas.height = Math.max(1, Math.round(video.videoHeight * scale));
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) =>
              blob
                ? finish(blob)
                : canvas.toBlob(
                    (jpeg) =>
                      jpeg
                        ? finish(jpeg)
                        : finish(null, new Error("Thumbnail encoding failed")),
                    "image/jpeg",
                    0.95,
                  ),
            "image/webp",
            0.98,
          );
        } catch (error) {
          finish(null, error);
        }
      };
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      try {
        if (new URL(sourceUrl, location.href).origin !== location.origin)
          video.crossOrigin = "anonymous";
      } catch {}
      video.addEventListener(
        "loadedmetadata",
        () => {
          try {
            video.currentTime = Math.min(
              seekTime,
              Math.max(0.01, (Number(video.duration) || seekTime) - 0.05),
            );
          } catch (error) {
            finish(null, error);
          }
        },
        { once: true },
      );
      video.addEventListener("seeked", () => setTimeout(capture, 50), {
        once: true,
      });
      video.addEventListener(
        "loadeddata",
        () =>
          setTimeout(() => {
            if (!settled && video.readyState >= 2) capture();
          }, 350),
        { once: true },
      );
      video.addEventListener(
        "error",
        () => finish(null, new Error("Video frame could not be loaded")),
        { once: true },
      );
      video.src = sourceUrl;
      video.load();
    });
  }
  async function createAutomaticListingThumbnail(videoItem) {
    const source = videoItem?.previewUrl || videoItem?.publicUrl;
    if (!source) throw new Error("Video preview URL is missing");
    let blob;
    try {
      blob = await generateListingVideoThumbnail(source, 0.1);
    } catch {
      blob = await generateListingVideoThumbnail(source, 0.01);
    }
    if (
      !state.listingMedia.includes(videoItem) ||
      listingMediaByRole("thumbnail").length
    )
      return null;
    const previewUrl = URL.createObjectURL(blob),
      thumbnailItem = {
        fileId: null,
        previewUrl,
        publicUrl: previewUrl,
        mimeType: blob.type,
        role: "thumbnail",
        generatedPreview: true,
        pending: true,
      };
    state.listingMedia.push(thumbnailItem);
    const thumbnailNode = document.getElementById("npati-listing-thumbnail");
    if (thumbnailNode) thumbnailNode.innerHTML = listingUploadArea("thumbnail");
    updateProductPreview(document.getElementById("npati-listing-form"));
    try {
      const extension = blob.type === "image/webp" ? "webp" : "jpg",
        body = new FormData();
      body.append(
        "file",
        blob,
        `Product_video_thumbnail_${Date.now()}.${extension}`,
      );
      body.append("title", "Product video thumbnail");
      const attachment = await wp.apiFetch({
        path: "/wp/v2/media",
        method: "POST",
        body,
      });
      if (!attachment?.id)
        throw new Error("WordPress could not save the generated thumbnail");
      const imported = await api("market/media/import", {
        method: "POST",
        data: { attachmentId: attachment.id },
      });
      Object.assign(thumbnailItem, imported, {
        attachmentId: attachment.id,
        previewUrl,
        publicUrl:
          imported.publicUrl ||
          imported.public_url ||
          attachment.source_url ||
          previewUrl,
        mimeType: imported.mimeType || imported.mime_type || blob.type,
        pending: false,
      });
    } catch (error) {
      thumbnailItem.pending = false;
      thumbnailItem.uploadError = error?.message || "Thumbnail upload failed";
      console.warn(
        "[NPATI Hub] Generated thumbnail could not be transferred",
        error,
      );
    }
    return thumbnailItem;
  }
  function listingUploadPreview(role) {
    const items = listingMediaByRole(role);
    return items
      .map(
        (m, index) =>
          `<figure>${role === "video" ? `<video src="${esc(m.previewUrl || m.publicUrl)}" muted playsinline preload="metadata"></video><span class="npati-uploaded-media-label">${esc(listingText("Video uploaded", "Відео завантажено"))}</span>` : `<img src="${esc(m.previewUrl || m.publicUrl)}" alt="">`}<button type="button" data-action="remove-listing-upload" data-role="${role}" data-index="${index}" aria-label="${esc(listingText("Remove", "Видалити"))}">${closeIcon}</button>${role === "photo" ? `<input class="npati-photo-color" data-photo-color="${index}" maxlength="12" placeholder="${esc(listingText("Color", "Колір"))}" value="${esc(m.color || "")}">` : ""}</figure>`,
      )
      .join("");
  }
  function listingUploadArea(role) {
    const items = listingMediaByRole(role),
      target = `listing-${role === "photo" ? "photos" : role}`,
      multiple = role === "photo" ? "1" : "0",
      button =
        role === "photo"
          ? `${listingImageSquareIcon()}<strong>${esc(listingText("Drag photos here or click to select", "Перетягніть фото сюди або натисніть для вибору"))}</strong>`
          : role === "video"
            ? `${listingFilmIcon()}<strong>${esc(listingText("Click to upload video (up to 2GB)", "Натисніть для завантаження відео (до 2GB)"))}</strong>`
            : `${listingImageIcon()}<strong>${esc(listingText("Click to upload thumbnail", "Натисніть для завантаження мініатюри"))}</strong>`;
    return `${listingUploadPreview(role)}${(role === "photo" ? items.length < 6 : !items.length) ? `<button type="button" class="npati-create-drop${role === "photo" ? "" : " is-compact"}" data-action="pick-media" data-target="${target}" data-multiple="${multiple}">${button}</button>` : ""}`;
  }
  function scheduleCalendarMarkup(value) {
    const selected = value ? new Date(`${value}T12:00:00`) : new Date(),
      view =
        state.scheduleCalendarDate ||
        new Date(selected.getFullYear(), selected.getMonth(), 1),
      year = view.getFullYear(),
      month = view.getMonth(),
      first = new Date(year, month, 1),
      offset = (first.getDay() + 6) % 7,
      days = new Date(year, month + 1, 0).getDate(),
      today = new Date();
    today.setHours(0, 0, 0, 0);
    const cells = Array.from({ length: offset }, () => "<span></span>");
    for (let day = 1; day <= days; day++) {
      const date = new Date(year, month, day),
        iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      cells.push(
        `<button type="button" data-action="schedule-day" data-date="${iso}"${date < today ? " disabled" : ""} class="${iso === value ? "is-selected" : ""}${date.getTime() === today.getTime() ? " is-today" : ""}">${day}</button>`,
      );
    }
    return `<div class="npati-schedule-calendar-header"><button type="button" data-action="schedule-month-prev" aria-label="Previous month">${caretLeftIcon}</button><strong>${esc(new Intl.DateTimeFormat(uiLanguage === "uk" ? "uk-UA" : "en-US", { month: "long", year: "numeric" }).format(view))}</strong><button type="button" data-action="schedule-month-next" aria-label="Next month">${caretRightIcon}</button></div><div class="npati-schedule-weekdays">${(uiLanguage === "uk" ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]).map((x) => `<span>${x}</span>`).join("")}</div><div class="npati-schedule-days">${cells.join("")}</div>`;
  }
  async function listingForm() {
    const editing = state.editingListing;
    root.innerHTML = '<div class="npati-skeleton"><i></i><i></i></div>';
    try {
      state.schema = state.schema || (await api("market/listing-schema"));
    } catch (e) {
      state.schema = {
        country: cfg.market,
        categories: [],
        addresses: [],
        warning: e?.message || "NPATI is temporarily unavailable.",
        fallback: true,
      };
    }
    if (
      !Array.isArray(state.schema.addresses) ||
      !state.schema.addresses.length
    ) {
      try {
        const savedAddresses = await api("market/addresses");
        if (Array.isArray(savedAddresses))
          state.schema.addresses = savedAddresses;
        else if (Array.isArray(savedAddresses?.data))
          state.schema.addresses = savedAddresses.data;
      } catch (error) {
        console.warn(
          "[NPATI Hub] Saved addresses could not be loaded separately",
          error,
        );
      }
    }
    const categoryTree = listingCategoryTree(state.schema.categories || []),
      flat = [];
    const walk = (items, depth = 0) =>
      (items || []).forEach((c) => {
        flat.push({ ...c, depth });
        walk(c.subcategories, depth + 1);
      });
    walk(categoryTree);
    state.categoryFlat = flat;
    const addresses = listingMarketAddresses(state.schema.addresses || []);
    state.schema.addresses = addresses;
    const currency =
      { US: "USD", UA: "UAH", CA: "CAD", GB: "GBP" }[
        String(cfg.market).toUpperCase()
      ] || "USD";
    state.listingMedia = editing ? listingEditorMedia(editing) : [];
    const t = (en, ua) => esc(listingText(en, ua));
    const descriptionPlaceholder = `Почніть з чіткого та стислого опису товару. Вкажіть основні характеристики та стан.\n\nПриклад:\n\nОсновні характеристики:\n- Вражаючий дисплей 6.1 дюйма Super Retina XDR з ProMotion.\n- Потужний чип A16 Bionic для блискавичної продуктивності.\n- Професійна камера: 48 Мп основна камера для чудової деталізації.\n- Батарея на весь день.\n- Міцний дизайн з Ceramic Shield.\n\nВ комплекті:\n- iPhone 14 Pro\n- Кабель USB-C до Lightning\n\nПримітка продавця: (За бажанням: додайте будь-які додаткові деталі, наприклад, невелику подряпину або стан батареї 95%)`;
    root.innerHTML = `<section class="npati-create-heading"><button class="npati-back-button" data-route="market">← ${t("Marketplace", "Маркет")}</button><h1>${editing ? t("Edit product", "Редагування оголошення") : t("Submit a video listing", "Подати відео оголошення")}</h1></section>
    <form id="npati-listing-form" class="npati-product-layout npati-create-product"${editing ? ` data-listing-id="${esc(editing.id)}"` : ""}><main><section class="npati-form-card npati-create-card">
      <label>${t("Title", "Заголовок")}<input name="title" minlength="5" maxlength="60" required placeholder="${t("Apple iPhone 14 Pro – 128GB - Midnight", "Apple iPhone 14 Pro – 128ГБ - Темна ніч")}"><span class="npati-counter" data-counter="title">0/60</span></label>
      <label>${t("Category", "Категорія")}${listingCategorySelector(categoryTree)}</label>
      <label>${t("Product description", "Опис продукту")}<textarea name="description" minlength="20" maxlength="2000" required placeholder="${esc(uiLanguage === "uk" ? descriptionPlaceholder : "Start with a clear and concise description of the item. Include its key features and condition.")}" rows="12"></textarea><span class="npati-counter" data-counter="description">0/2000</span></label>
      <div class="npati-create-section"><h2>${t("Product photos", "Фото продукту")}</h2><label class="npati-switch-row"><input type="checkbox" name="enableColors"><i></i><span>${t("Label photos by color", "Позначити фото за кольором")}</span></label><div id="npati-listing-photos" class="npati-create-media-grid npati-create-photo-grid">${listingUploadArea("photo")}</div><div id="npati-listing-photo" hidden></div><p>${t("Supported formats: PNG, JPG, GIF, WEBP.", "Підтримувані формати: PNG, JPG, GIF, WEBP.")}<br><em>✨ ${t("Images are automatically optimized for faster loading", "Зображення автоматично оптимізуються для швидшого завантаження")}</em></p></div>
      <div class="npati-create-section"><h2>${t("Video and thumbnail", "Відео та мініатюра")}</h2><div class="npati-create-video-row"><div class="npati-create-upload-pair"><div id="npati-listing-video" class="npati-create-media-grid npati-create-single-media">${listingUploadArea("video")}</div><div id="npati-listing-thumbnail" class="npati-create-media-grid npati-create-single-media">${listingUploadArea("thumbnail")}</div></div><div class="npati-create-video-switches"><div><strong>${t("Show author", "Показати автора")}</strong><label class="npati-switch-row"><input type="checkbox" name="showAuthor" checked><i></i><span><small data-switch-state>${t("Enabled", "Увімкнено")}</small></span></label></div><div><strong>${t("Disable purchase", "Вимкнути покупку")}</strong><label class="npati-switch-row"><input type="checkbox" name="disableBuy"><i></i><span><small data-switch-state>${t("Disabled", "Вимкнено")}</small></span></label></div></div></div></div>
      <div class="npati-create-divider"></div>
      <label class="npati-switch-row"><input type="checkbox" name="isPost"><i></i><span><strong>${t("Post (without price, without Buy now button)", "Пост (без ціни, без кнопки Купити зараз)")}</strong><small>${t("Product", "Продукт")}</small></span></label><p class="npati-field-help">${t("When enabled, this will be a post without a price or purchase button", "Якщо увімкнено, це буде пост без ціни та кнопки покупки")}</p>
      <div data-product-price><label class="npati-switch-row"><input type="checkbox" name="isFree"><i></i><span><strong>${t("Free", "Безкоштовно")}</strong><small data-switch-state>${t("Disabled", "Вимкнено")}</small></span></label><div class="npati-form-grid"><label>${t(`Price (${currency})`, currency === "UAH" ? "Ціна (грн)" : `Ціна (${currency})`)}<input name="price" type="number" min="0" step="0.01" placeholder="0.00" required></label><label>${t(`Discount price (${currency})`, currency === "UAH" ? "Ціна зі знижкою (грн)" : `Ціна зі знижкою (${currency})`)}<input name="discountPrice" type="number" min="0" step="0.01" placeholder="0.00"></label></div></div><input type="hidden" name="currency" value="${currency}">
      <div class="npati-create-section"><h2>${t("Product dimensions", "Розміри продукту")}</h2><label class="npati-switch-row"><input type="checkbox" name="enableSizes"><i></i><span>${t("Show sizes", "Показати розміри")}</span></label><div class="npati-size-fields" hidden>${[1, 2, 3, 4, 5, 6].map((n) => `<div><label>${t("Size", "Розмір")} ${n}<input name="size_${n}" maxlength="16" placeholder="M, L, XL..."></label><label>${t("Details", "Деталі")}<input name="sizeDetails_${n}" placeholder="${t("Chest: 38, Length: 27...", "Обхват грудей: 38, Довжина: 27...")}"></label></div>`).join("")}</div></div>
      <div class="npati-form-grid"><label>${t("Location address", "Адреса місцезнаходження")}<span class="npati-address-control"><select name="shippingAddressId">${listingAddressOptions(addresses)}</select><button type="button" data-action="open-address-modal" aria-label="${t("Add new address", "Додати нову адресу")}" title="${t("Add new address", "Додати нову адресу")}">＋</button></span></label><label>${t("Condition", "Стан")}<select name="condition"><option value="new">${t("New", "Новий")}</option><option value="used">${t("Used", "Вживаний")}</option><option value="refurbished">${t("Refurbished", "Відновлений")}</option><option value="spare-parts">${t("For parts", "Запчастини")}</option></select></label></div><input type="hidden" name="location">
      <div class="npati-form-grid"><label>${t("Contact phone", "Контактний телефон")}<input name="phone" type="tel" maxlength="40" autocomplete="tel" placeholder="0997874532"></label><label>${t("Email", "Електронна пошта")}<input name="email" type="email" maxlength="190" autocomplete="email" placeholder="example@email.com"></label></div>
      <div class="npati-create-section"><h2>${t("Tags", "Теги")}</h2><div class="npati-tag-entry"><input name="tagInput" maxlength="20" placeholder="${t("Enter tag...", "Введіть тег...")}"><button type="button" class="npati-secondary-button" data-action="add-listing-tag">${t("Add", "Додати")}</button></div><div class="npati-tag-list"></div><input type="hidden" name="tags"><p>${t("Add up to 10 tags for better product discovery.", "Додайте до 10 тегів для кращого пошуку продукту.")}</p></div>
      <div class="npati-create-section"><h2>${t("Delivery", "Доставка")}</h2><label class="npati-switch-row"><input type="checkbox" name="shippingAvailable"><i></i><span>${t("Include delivery", "Включити доставку")}</span></label><div class="npati-package-fields" hidden><h3>${t("Package dimensions", "Розміри посилки")}</h3><label>${t("Package size", "Розмір посилки")}<select name="packageSizePreset"><option value="custom">${t("Custom", "Власний")}</option><option value="small">${t("Small", "Малий")}</option><option value="medium">${t("Medium", "Середній")}</option><option value="large">${t("Large", "Великий")}</option></select></label><div class="npati-package-grid"><label>${t("Length (cm)", "Довжина (см)")}<input name="packageLength" type="number" min="1" max="600" step="0.1" placeholder="20"></label><label>${t("Width (cm)", "Ширина (см)")}<input name="packageWidth" type="number" min="1" max="170" step="0.1" placeholder="15"></label><label>${t("Height (cm)", "Висота (см)")}<input name="packageHeight" type="number" min="1" max="220" step="0.1" placeholder="10"></label><label>${t("Weight (kg)", "Вага (кг)")}<input name="weight" type="number" min="1" max="1000" step="0.01" placeholder="1"></label></div><p>${t("Minimum: 1 kg, maximum: 1000 kg (according to Nova Poshta requirements)", "Мінімум: 1 кг, максимум: 1000 кг (відповідно до вимог Nova Poshta)")}</p></div></div>
      <input type="checkbox" name="scheduleEnabled" hidden><div class="npati-schedule-modal" role="dialog" aria-modal="true" aria-labelledby="npati-schedule-title" hidden><div class="npati-schedule-dialog"><header><div><span>NPATI HUB</span><h2 id="npati-schedule-title">${t("Schedule publication", "Запланувати публікацію")}</h2><p>${t("Choose the exact publication date, time and timezone.", "Оберіть точну дату, час і часовий пояс публікації.")}</p></div><button type="button" data-action="schedule-cancel" aria-label="${t("Close", "Закрити")}">${closeIcon}</button></header><section class="npati-schedule-content"><div class="npati-schedule-calendar">${scheduleCalendarMarkup("")}</div><div class="npati-schedule-settings"><label>${t("Selected date", "Обрана дата")}<input name="scheduleDate" type="text" readonly placeholder="YYYY-MM-DD"></label><label>${t("Publication time", "Час публікації")}<input name="scheduleTime" type="time"></label><label>${t("Timezone", "Часовий пояс")}<input name="scheduleTimezone" value="${esc(cfg.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC")}" list="npati-schedule-timezones"><datalist id="npati-schedule-timezones"><option value="Europe/Kyiv"><option value="Europe/London"><option value="America/New_York"><option value="America/Chicago"><option value="America/Los_Angeles"><option value="America/Toronto"><option value="America/Vancouver"></datalist></label><p>${t("The publication will use your selected NPATI market and connected account.", "Публікація використовуватиме вибраний ринок NPATI та підключений обліковий запис.")}</p></div></section><p class="npati-schedule-error" role="alert"></p><footer><button type="button" class="npati-secondary-button" data-action="schedule-cancel">${t("Cancel", "Скасувати")}</button><button type="button" class="npati-primary-button" data-action="schedule-confirm">${t("Create and schedule", "Створити й запланувати")}</button></footer></div></div>
    </section><footer class="npati-create-actions"><span class="npati-form-status" role="status"></span><button type="button" class="npati-secondary-button" data-action="toggle-listing-schedule">${t("Schedule publication", "Запланувати публікацію")}</button><button type="button" class="npati-secondary-button" data-route="market">${t("Cancel", "Скасувати")}</button><button type="submit" class="npati-primary-button">${editing ? t("Update", "Оновити") : t("Create", "Створити")}</button></footer></main><aside><section class="npati-create-preview"><h2 class="npati-preview-heading">Product Preview</h2><article class="npati-preview-card"><div class="npati-preview-media" data-preview-index="0"></div><div class="npati-preview-body"><h3 class="npati-preview-title">${t("Product title", "Назва продукту")}</h3><div class="npati-preview-price-row"><div><strong class="npati-preview-price">0 ${currency}</strong><del class="npati-preview-old-price" hidden></del></div><span class="npati-preview-open" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div><footer class="npati-preview-meta"><div><strong class="npati-preview-location"></strong><time class="npati-preview-date"></time></div><span class="npati-preview-views">${eyeIcon}<b>0</b></span></footer></div></article></section></aside></form>`;
    const form = document.getElementById("npati-listing-form");
    form.elements.disableBuy.checked = true;
    form.elements.disableBuy.disabled = true;
    form.elements.disableBuy.setAttribute("aria-disabled", "true");
    form.elements.shippingAvailable.checked = false;
    form.elements.shippingAvailable.disabled = true;
    form.elements.shippingAvailable.setAttribute("aria-disabled", "true");
    form.insertAdjacentHTML("beforeend", listingAddressModal());
    bindCreateProductForm(form);
    if (editing) populateListingForm(form, editing);
    syncCreateProductForm(form);
    form.addEventListener("input", () => {
      syncCreateProductForm(form);
      updateProductPreview(form);
    });
    form.addEventListener("change", () => {
      syncCreateProductForm(form);
      updateProductPreview(form);
    });
    form.addEventListener("submit", submitListing);
    updateProductPreview(form);
  }
  function listingEditorMedia(item) {
    const photos = (item.photos || []).map((url, index) => ({
      fileId: item.photoIds?.[index] || url,
      previewUrl: url,
      publicUrl: url,
      mimeType: "image/jpeg",
      role: "photo",
      color: item.colors?.[index] || "",
    }));
    if (item.video)
      photos.push({
        fileId: item.videoId || item.video,
        previewUrl: item.video,
        publicUrl: item.video,
        mimeType: "video/mp4",
        role: "video",
      });
    if (item.thumbnail)
      photos.push({
        fileId: item.thumbnailId || item.thumbnail,
        previewUrl: item.thumbnail,
        publicUrl: item.thumbnail,
        mimeType: "image/jpeg",
        role: "thumbnail",
      });
    return photos;
  }
  function populateListingForm(form, item) {
    const set = (name, value) => {
      const input = form.elements[name];
      if (input && value !== undefined && value !== null)
        input.value = String(value);
    };
    [
      "title",
      "description",
      "categoryId",
      "price",
      "discountPrice",
      "currency",
      "condition",
      "location",
      "shippingAddressId",
      "phone",
      "email",
      "packageSizePreset",
      "packageLength",
      "packageWidth",
      "packageHeight",
      "weight",
    ].forEach((name) => set(name, item[name]));
    [
      "isFree",
      "isPost",
      "enableColors",
      "enableSizes",
    ].forEach((name) => {
      if (form.elements[name])
        form.elements[name].checked = Boolean(item[name]);
    });
    if (form.elements.showAuthor)
      form.elements.showAuthor.checked = item.showAuthor !== false;
    form.elements.disableBuy.checked = true;
    form.elements.shippingAvailable.checked = false;
    (item.sizes || []).forEach((value, index) =>
      set(
        `size_${index + 1}`,
        typeof value === "object" ? value.name || value.size : value,
      ),
    );
    form.elements.tags.value = (item.tags || []).join(",");
    renderListingTags(form);
    const category = form.elements.categoryId;
    if (category && !category.value && item.categorySlug) {
      const match = (state.categoryFlat || []).find(
        (entry) =>
          String(entry.slug || "").toLowerCase() ===
            String(item.categorySlug).toLowerCase() ||
          String(entry.name || "").toLowerCase() ===
            String(item.categorySlug).replace(/-/g, " ").toLowerCase(),
      );
      if (match) category.value = match.id;
    }
  }
  function bindCreateProductForm(form) {
    const addressSelect = form.elements.shippingAddressId,
      modal = form.querySelector("[data-address-modal]"),
      modalControls = [...modal.querySelectorAll("input,select")],
      errorNode = modal.querySelector(".npati-address-error");
    let cityTimer,
      postalTimer,
      postalValidated = false;
    const addressChanged = () => {
      const option = addressSelect.selectedOptions?.[0];
      if (option?.value === "__add_address__") {
        addressSelect.value = "";
        openAddressModal();
        return;
      }
      if (form.elements.location)
        form.elements.location.value = option?.dataset.location || "";
      if (option?.dataset.phone)
        form.elements.phone.value = option.dataset.phone;
      if (option?.dataset.email)
        form.elements.email.value = option.dataset.email;
      updateProductPreview(form);
    };
    const setModalOpen = (open) => {
      modal.hidden = !open;
      modalControls.forEach((control) => (control.disabled = !open));
      document.body.classList.toggle("npati-address-open", open);
      if (!open) {
        postalValidated = false;
        errorNode.textContent = "";
        modal
          .querySelectorAll("input:not([type=checkbox])")
          .forEach((input) => (input.value = ""));
        modal
          .querySelectorAll("input[type=checkbox]")
          .forEach(
            (input) => (input.checked = input.name === "addressResidential"),
          );
        const city = modal.querySelector("[name=addressCity]"),
          warehouse = modal.querySelector("[name=addressWarehouse]"),
          results = modal.querySelector(".npati-address-city-results"),
          selected = modal.querySelector(".npati-address-city-selected"),
          warehouseField = modal.querySelector(
            ".npati-address-warehouse-field",
          ),
          warehouseDetails = modal.querySelector(
            ".npati-address-warehouse-details",
          ),
          postalStatus = modal.querySelector("[data-address-postal-status]");
        if (city) {
          city.innerHTML = "";
          city.hidden = true;
        }
        if (results) {
          results.innerHTML = "";
          results.hidden = true;
        }
        if (selected) selected.hidden = true;
        if (warehouseField) warehouseField.hidden = true;
        if (warehouseDetails) {
          warehouseDetails.textContent = "";
          warehouseDetails.hidden = true;
        }
        if (warehouse) {
          warehouse.innerHTML = '<option value="">Виберіть відділення</option>';
          warehouse.disabled = true;
        }
        if (postalStatus)
          postalStatus.textContent = "Введіть 5-значний поштовий індекс.";
      }
    };
    const openAddressModal = () => {
      setModalOpen(true);
      const profile = activeProfile || {};
      modal.querySelector("[name=addressFirstName]").value =
        profile.firstName || profile.first_name || "";
      modal.querySelector("[name=addressLastName]").value =
        profile.lastName || profile.last_name || "";
      modal.querySelector("[name=addressPhone]").value =
        profile.phone || form.elements.phone?.value || "";
      const email = modal.querySelector("[name=addressEmail]");
      if (email)
        email.value = profile.email || form.elements.email?.value || "";
      const warehouse = modal.querySelector("[name=addressWarehouse]");
      if (warehouse) warehouse.disabled = true;
      modal.querySelector("[name=addressDefault]").checked =
        !listingMarketAddresses(state.schema.addresses).length;
      modal.querySelector("[name=addressFirstName]").focus();
    };
    const extractList = (value) =>
      Array.isArray(value)
        ? value
        : Array.isArray(value?.data)
          ? value.data
          : Array.isArray(value?.items)
            ? value.items
            : [];
    const refreshAddressSelect = (selectedId) => {
      const addresses = listingMarketAddresses(state.schema.addresses || []);
      addressSelect.innerHTML = listingAddressOptions(addresses);
      addressSelect.value = selectedId || "";
      addressChanged();
    };
    modalControls.forEach((control) => (control.disabled = true));
    form
      .querySelector("[data-action=open-address-modal]")
      ?.addEventListener("click", openAddressModal);
    modal
      .querySelectorAll("[data-action=close-address-modal]")
      .forEach((button) =>
        button.addEventListener("click", () => setModalOpen(false)),
      );
    modal.addEventListener("click", (event) => {
      if (event.target === modal) setModalOpen(false);
    });
    addressSelect?.addEventListener("change", addressChanged);
    const defaultOption =
      [...addressSelect.options].find(
        (option) => option.dataset.default === "1",
      ) ||
      [...addressSelect.options].find(
        (option) => option.value && option.value !== "__add_address__",
      );
    if (defaultOption && !addressSelect.value) {
      addressSelect.value = defaultOption.value;
      addressChanged();
    }
    const citySearch = modal.querySelector("[name=addressCitySearch]"),
      citySelect = modal.querySelector("[name=addressCity]"),
      cityResults = modal.querySelector(".npati-address-city-results"),
      citySelected = modal.querySelector(".npati-address-city-selected"),
      warehouseSelect = modal.querySelector("[name=addressWarehouse]"),
      warehouseField = modal.querySelector(".npati-address-warehouse-field"),
      warehouseDetails = modal.querySelector(
        ".npati-address-warehouse-details",
      ),
      zipInput = modal.querySelector("[name=addressZip]"),
      postalStatus = modal.querySelector("[data-address-postal-status]");
    const loadWarehouses = async (option) => {
      if (!option?.value) return;
      citySearch.value = option.dataset.name || option.textContent;
      citySearch.parentElement.hidden = true;
      citySelected.hidden = false;
      citySelected.querySelector("strong").textContent =
        option.dataset.name || option.textContent;
      cityResults.hidden = true;
      warehouseField.hidden = false;
      warehouseSelect.disabled = true;
      warehouseSelect.innerHTML = `<option>${esc(listingText("Loading branches…", "Завантаження відділень…"))}</option>`;
      try {
        const warehouses = extractList(
          await api(
            `market/address-options?type=warehouses&cityRef=${encodeURIComponent(option.value)}&deliveryCityRef=${encodeURIComponent(option.dataset.deliveryRef || "")}`,
          ),
        );
        warehouseSelect.innerHTML = `<option value="">${esc(listingText("Select branch", "Виберіть відділення"))}</option>${warehouses.map((warehouse) => `<option value="${esc(warehouse.ref)}" data-number="${esc(warehouse.number || "")}" data-name="${esc(warehouse.name || "")}" data-address="${esc(warehouse.address || "")}" data-phone="${esc(warehouse.phone || "")}" data-schedule="${esc(warehouse.scheduleMonday || "")}">${esc(`${warehouse.number ? `${warehouse.number}: ` : ""}${warehouse.name || warehouse.address || ""}`)}</option>`).join("")}`;
        warehouseSelect.disabled = false;
        if (!warehouses.length) {
          warehouseSelect.innerHTML =
            '<option value="">Відділення не знайдено</option>';
        }
      } catch (error) {
        errorNode.textContent =
          error.message || "Не вдалося завантажити відділення Нової пошти.";
      }
    };
    citySearch?.addEventListener("input", () => {
      clearTimeout(cityTimer);
      const query = citySearch.value.trim();
      if (query.length < 2) {
        cityResults.hidden = true;
        cityResults.innerHTML = "";
        return;
      }
      cityResults.innerHTML = "<p>Завантаження…</p>";
      cityResults.hidden = false;
      cityTimer = setTimeout(async () => {
        try {
          citySearch.classList.add("is-loading");
          const cities = extractList(
            await api(
              `market/address-options?type=cities&query=${encodeURIComponent(query)}`,
            ),
          );
          citySelect.innerHTML = cities
            .map(
              (city) =>
                `<option value="${esc(city.ref)}" data-name="${esc(city.name || city.nameUa || "")}" data-delivery-ref="${esc(city.deliveryCityRef || city.delivery_city_ref || "")}">${esc([city.name || city.nameUa, city.region || city.area].filter(Boolean).join(", "))}</option>`,
            )
            .join("");
          cityResults.innerHTML = cities.length
            ? cities
                .map(
                  (city) =>
                    `<button type="button" data-city-ref="${esc(city.ref)}"><strong>${esc(city.name || city.nameUa || "")}</strong><span>${esc(city.area || city.region || "")}</span></button>`,
                )
                .join("")
            : "<p>Міст не знайдено</p>";
          cityResults.hidden = false;
        } catch (error) {
          errorNode.textContent =
            error.message ||
            listingText(
              "Cities could not be loaded.",
              "Не вдалося завантажити міста.",
            );
          cityResults.hidden = true;
        } finally {
          citySearch.classList.remove("is-loading");
        }
      }, 500);
    });
    cityResults?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-city-ref]");
      if (!button) return;
      citySelect.value = button.dataset.cityRef;
      citySelect.dispatchEvent(new Event("change", { bubbles: true }));
    });
    citySelect?.addEventListener("change", () =>
      loadWarehouses(citySelect.selectedOptions[0]),
    );
    modal
      .querySelector("[data-action=change-address-city]")
      ?.addEventListener("click", () => {
        citySelect.innerHTML = "";
        citySearch.value = "";
        citySearch.parentElement.hidden = false;
        citySelected.hidden = true;
        cityResults.hidden = true;
        warehouseField.hidden = true;
        warehouseSelect.innerHTML =
          '<option value="">Виберіть відділення</option>';
        warehouseSelect.disabled = true;
        warehouseDetails.hidden = true;
        citySearch.focus();
      });
    warehouseSelect?.addEventListener("change", () => {
      const option = warehouseSelect.selectedOptions[0];
      if (!option?.value) {
        warehouseDetails.hidden = true;
        return;
      }
      warehouseDetails.innerHTML = `<strong>${esc(option.dataset.name || option.textContent)}</strong><span>${esc(option.dataset.address || "")}</span>${option.dataset.phone ? `<span>☎ ${esc(option.dataset.phone)}</span>` : ""}${option.dataset.schedule ? `<span>${esc(option.dataset.schedule)}</span>` : ""}`;
      warehouseDetails.hidden = false;
    });
    modal
      .querySelector("[name=addressPhone]")
      ?.addEventListener("input", (event) => {
        const digits = event.target.value.replace(/\D/g, ""),
          local = (
            digits.startsWith("380")
              ? digits.slice(3)
              : digits.startsWith("0")
                ? digits.slice(1)
                : digits
          ).slice(0, 9);
        event.target.value = !local
          ? ""
          : local.length <= 2
            ? `+380 ${local}`
            : local.length <= 5
              ? `+380 ${local.slice(0, 2)} ${local.slice(2)}`
              : local.length <= 7
                ? `+380 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`
                : `+380 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5, 7)} ${local.slice(7)}`;
      });
    zipInput?.addEventListener("input", () => {
      clearTimeout(postalTimer);
      postalValidated = false;
      zipInput.value = zipInput.value.replace(/\D/g, "").slice(0, 5);
      if (zipInput.value.length !== 5) {
        postalStatus.textContent = "Введіть 5-значний поштовий індекс.";
        postalStatus.className = "";
        return;
      }
      postalStatus.textContent = "Перевіряємо індекс…";
      postalStatus.className = "is-checking";
      postalTimer = setTimeout(async () => {
        try {
          const result = await api(
              `market/address-options?type=postal&postalCode=${encodeURIComponent(zipInput.value)}&cityRef=${encodeURIComponent(citySelect?.value || "")}`,
            ),
            valid = Boolean(result?.valid ?? result?.data?.valid);
          postalValidated = valid;
          postalStatus.textContent = valid
            ? "Індекс перевірено"
            : "Введіть коректний поштовий індекс.";
          postalStatus.className = valid ? "is-valid" : "is-invalid";
        } catch {
          postalStatus.textContent = "Не вдалося перевірити індекс.";
          postalStatus.className = "is-invalid";
        }
      }, 350);
    });
    modal
      .querySelector("[data-action=save-address]")
      ?.addEventListener("click", async (event) => {
        const button = event.currentTarget,
          market = String(cfg.market || "US").toUpperCase(),
          ua = market === "UA",
          firstName = modal
            .querySelector("[name=addressFirstName]")
            .value.trim(),
          lastName = modal.querySelector("[name=addressLastName]").value.trim(),
          phone = modal.querySelector("[name=addressPhone]").value.trim(),
          zip = modal.querySelector("[name=addressZip]").value.trim(),
          cityOption = citySelect?.selectedOptions?.[0],
          warehouseOption = warehouseSelect?.selectedOptions?.[0],
          city = ua
            ? cityOption?.dataset.name || ""
            : modal.querySelector("[name=addressCityManual]")?.value.trim(),
          street1 = ua
            ? warehouseOption?.dataset.address ||
              warehouseOption?.textContent ||
              ""
            : modal.querySelector("[name=addressStreet1]")?.value.trim(),
          addressState = ua
            ? ""
            : modal.querySelector("[name=addressState]")?.value.trim();
        if (
          !firstName ||
          !lastName ||
          !phone ||
          !zip ||
          !city ||
          !street1 ||
          (ua &&
            (!/^\d{5}$/.test(zip) ||
              !cityOption?.value ||
              !warehouseOption?.value)) ||
          (!ua && !addressState)
        ) {
          errorNode.textContent = listingText(
            "Complete all required address fields.",
            "Заповніть усі обов’язкові поля адреси.",
          );
          return;
        }
        const deliveryMetadata = ua
          ? {
              nova_poshta: {
                city_ref: cityOption.value,
                city_name: city,
                warehouse_ref: warehouseOption.value,
                warehouse_number: warehouseOption.dataset.number || "",
                warehouse_name:
                  warehouseOption.dataset.name ||
                  warehouseOption.textContent ||
                  "",
                warehouse_address: street1,
              },
            }
          : {};
        const payload = {
          addressType: ua
            ? "home"
            : modal.querySelector("[name=addressType]").value,
          isDefault: modal.querySelector("[name=addressDefault]").checked,
          isResidential: ua
            ? modal.querySelector("[name=addressResidential]").checked
            : true,
          firstName,
          lastName,
          name: `${lastName} ${firstName}`,
          company:
            modal.querySelector("[name=addressCompany]")?.value.trim() || "",
          phone,
          email: modal.querySelector("[name=addressEmail]")?.value.trim() || "",
          street1,
          street2:
            modal.querySelector("[name=addressStreet2]")?.value.trim() || "",
          city,
          state: addressState,
          zip,
          country: market,
          deliveryMetadata,
          shippoValidated: ua && postalValidated,
        };
        button.disabled = true;
        errorNode.textContent = "";
        try {
          const response = await api("market/addresses", {
              method: "POST",
              data: payload,
            }),
            created = response?.data || response;
          if (!created?.id)
            throw new Error(
              listingText(
                "NPATI did not return the saved address.",
                "NPATI не повернув збережену адресу.",
              ),
            );
          state.schema.addresses = [
            created,
            ...(state.schema.addresses || []).filter(
              (address) => String(address.id) !== String(created.id),
            ),
          ];
          refreshAddressSelect(created.id);
          setModalOpen(false);
        } catch (error) {
          errorNode.textContent =
            error.message ||
            listingText(
              "Address could not be saved.",
              "Не вдалося зберегти адресу.",
            );
        } finally {
          button.disabled = false;
        }
      });
    form.elements.packageSizePreset?.addEventListener("change", () => {
      const preset = {
        small: [20, 15, 10, 2],
        medium: [30, 20, 15, 5],
        large: [40, 30, 20, 10],
      }[form.elements.packageSizePreset.value];
      if (preset)
        ["packageLength", "packageWidth", "packageHeight", "weight"].forEach(
          (name, index) => (form.elements[name].value = preset[index] || ""),
        );
    });
  }
  function syncCreateProductForm(form) {
    for (const name of ["title", "description"]) {
      const field = form.elements[name],
        counter = form.querySelector(`[data-counter="${name}"]`);
      if (counter)
        counter.textContent = `${field.value.length}/${field.maxLength}`;
    }
    form.querySelectorAll(".npati-switch-row").forEach((row) => {
      const input = row.querySelector("input[type=checkbox]"),
        stateNode = row.querySelector("[data-switch-state]");
      if (stateNode)
        stateNode.textContent = input.checked
          ? listingText("Enabled", "Увімкнено")
          : listingText("Disabled", "Вимкнено");
    });
    const hidePrice =
        form.elements.isPost.checked || form.elements.isFree.checked,
      priceWrap = form.querySelector("[data-product-price]");
    priceWrap.classList.toggle("is-post", form.elements.isPost.checked);
    priceWrap.querySelector(".npati-form-grid").hidden = hidePrice;
    form.elements.price.required = !hidePrice;
    if (hidePrice) {
      form.elements.price.value = "";
      form.elements.discountPrice.value = "";
    }
    form.querySelector(".npati-size-fields").hidden =
      !form.elements.enableSizes.checked;
    form.querySelector(".npati-package-fields").hidden =
      !form.elements.shippingAvailable.checked;
    form.querySelectorAll(".npati-photo-color").forEach((input) => {
      input.hidden = !form.elements.enableColors.checked;
      const photo =
        listingMediaByRole("photo")[Number(input.dataset.photoColor)];
      if (photo) photo.color = input.value;
    });
    const selectedCategory = (state.categoryFlat || []).find(
        (item) => String(item.id) === String(form.elements.categoryId.value),
      ),
      categoryControl = form.querySelector(".npati-category-control span"),
      categoryClear = form.querySelector(".npati-category-clear");
    if (categoryControl)
      categoryControl.textContent =
        selectedCategory?.name ||
        listingText("Select category", "Виберіть категорію");
    if (categoryClear) categoryClear.hidden = !selectedCategory;
    form
      .querySelector(".npati-category-picker")
      ?.classList.toggle("has-value", Boolean(selectedCategory));
    form
      .querySelectorAll(".npati-category-option")
      .forEach((option) =>
        option.classList.toggle(
          "is-selected",
          String(option.dataset.id) === String(form.elements.categoryId.value),
        ),
      );
  }
  function renderListingTags(form) {
    const tags = (form.elements.tags.value || "")
      .split(",")
      .filter(Boolean)
      .slice(0, 10);
    form.elements.tags.value = tags.join(",");
    form.querySelector(".npati-tag-list").innerHTML = tags
      .map(
        (tag, index) =>
          `<span>${esc(tag)}<button type="button" data-action="remove-listing-tag" data-index="${index}" aria-label="Remove">${closeIcon}</button></span>`,
      )
      .join("");
  }
  function updateProductPreview(form) {
    if (!form) return;
    const preview = form.querySelector(".npati-preview-card");
    if (!preview) return;
    const currency = form.elements.currency.value,
      symbol =
        { UAH: "грн", USD: "$", CAD: "C$", GBP: "£" }[currency] || currency,
      format = (value) =>
        `${new Intl.NumberFormat(uiLanguage === "uk" ? "uk-UA" : "en-US", { maximumFractionDigits: 2 }).format(Number(value) || 0)} ${symbol}`.trim();
    preview.querySelector(".npati-preview-title").textContent =
      form.elements.title.value ||
      listingText("Product title", "Назва продукту");
    const price = preview.querySelector(".npati-preview-price"),
      oldPrice = preview.querySelector(".npati-preview-old-price"),
      regular = form.elements.price.value,
      discount = form.elements.discountPrice.value;
    price.textContent = form.elements.isPost.checked
      ? ""
      : form.elements.isFree.checked
        ? listingText("Free", "Безкоштовно")
        : format(discount || regular);
    oldPrice.hidden = Boolean(
      form.elements.isPost.checked ||
        form.elements.isFree.checked ||
        !discount ||
        !regular,
    );
    oldPrice.textContent = oldPrice.hidden ? "" : format(regular);
    const addressOption = form.elements.shippingAddressId?.selectedOptions?.[0],
      location =
        addressOption?.dataset.location || form.elements.location?.value || "";
    preview.querySelector(".npati-preview-location").textContent = location;
    preview.querySelector(".npati-preview-location").hidden = !location;
    preview.querySelector(".npati-preview-date").textContent = listingDate(
      new Date().toISOString(),
    );
    const mediaNode = preview.querySelector(".npati-preview-media"),
      previousVideo = mediaNode.querySelector("video"),
      photos = listingMediaByRole("photo"),
      thumbnail = listingMediaByRole("thumbnail")[0],
      video = listingMediaByRole("video")[0],
      media = [...photos],
      thumbnailVideoMode = Boolean(video && thumbnail && !photos.length),
      mediaCarouselMode = Boolean(video && photos.length);
    previousVideo?.pause();
    preview.classList.toggle("is-thumbnail-video", thumbnailVideoMode);
    preview.classList.toggle("is-media-carousel", mediaCarouselMode);
    preview.dataset.cardVariant = thumbnailVideoMode ? "tall" : "short";
    if (video)
      media.push({
        ...video,
        previewUrl:
          thumbnail?.previewUrl ||
          thumbnail?.publicUrl ||
          video.previewUrl ||
          video.publicUrl,
        videoUrl: video.previewUrl || video.publicUrl,
      });
    else if (thumbnail && !media.length) media.push(thumbnail);
    let index = Math.min(
        Number(mediaNode.dataset.previewIndex) || 0,
        Math.max(0, media.length - 1),
      ),
      activeItem = null;
    mediaNode.dataset.previewIndex = String(index);
    const profile = activeProfile || {},
      username = String(profile.username || "current_user").replace(/^@/, ""),
      avatar = profile.avatar || "",
      initial = String(username || "N")
        .charAt(0)
        .toUpperCase(),
      author = form.elements.showAuthor.checked
        ? `<div class="npati-preview-author">${avatar ? `<img src="${esc(avatar)}" alt="">` : `<span>${esc(initial)}</span>`}<strong>@${esc(username)}</strong></div>`
        : "",
      liked = mediaNode.dataset.liked === "1";
    const heart = `<button type="button" class="npati-preview-like${liked ? " is-liked" : ""}" data-action="toggle-preview-like" aria-pressed="${liked ? "true" : "false"}"><svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg><b>${liked ? "1" : "0"}</b></button>`;
    if (!media.length)
      mediaNode.innerHTML = `${author}${heart}<div class="npati-preview-empty">${listingImageSquareIcon()}<span>${esc(listingText("No photos or videos", "Немає фото або відео"))}</span></div>`;
    else {
      activeItem = media[index];
      const url = activeItem.previewUrl || activeItem.publicUrl,
        mediaMarkup = activeItem.videoUrl
          ? `<video src="${esc(activeItem.videoUrl)}"${url ? ` poster="${esc(url)}"` : ""} muted loop playsinline></video>`
          : `<img src="${esc(url)}" alt="">`,
        controls =
          media.length > 1
            ? `<button type="button" class="npati-preview-carousel is-prev" data-action="preview-media-prev" aria-label="Previous">${caretLeftIcon}</button><button type="button" class="npati-preview-carousel is-next" data-action="preview-media-next" aria-label="Next">${caretRightIcon}</button><div class="npati-preview-dots">${media.map((_, i) => `<button type="button" data-action="preview-media-dot" data-index="${i}" class="${i === index ? "is-active" : ""}" aria-label="${i + 1}"></button>`).join("")}</div>`
            : "";
      mediaNode.innerHTML = `${mediaMarkup}${author}${heart}${controls}`;
    }
    mediaNode.onmouseenter = () => {
      const videoElement = mediaNode.querySelector("video");
      if (videoElement) videoElement.play().catch(() => {});
    };
    mediaNode.onmouseleave = () => {
      const videoElement = mediaNode.querySelector("video");
      if (videoElement) videoElement.pause();
    };
    if (mediaCarouselMode && activeItem?.videoUrl)
      queueMicrotask(() =>
        mediaNode
          .querySelector("video")
          ?.play()
          .catch(() => {}),
      );
  }
  async function submitListing(event) {
    event.preventDefault();
    const form = event.currentTarget,
      status = form.querySelector("[role=status]"),
      button = form.querySelector("[type=submit]");
    if (!state.listingMedia.length) {
      status.textContent = listingText(
        "Add at least one product photo or video.",
        "Додайте хоча б одне фото або відео.",
      );
      return;
    }
    const videos = listingMediaByRole("video"),
      photos = listingMediaByRole("photo"),
      thumbnails = listingMediaByRole("thumbnail");
    if (videos.length > 1) {
      status.textContent = "A listing can contain only one video.";
      return;
    }
    if (
      form.elements.discountPrice.value &&
      Number(form.elements.discountPrice.value) >=
        Number(form.elements.price.value)
    ) {
      status.textContent = listingText(
        "The discount price must be lower than the regular price.",
        "Ціна зі знижкою має бути меншою за основну ціну.",
      );
      return;
    }
    let scheduledFor;
    if (form.elements.scheduleEnabled?.checked) {
      scheduledFor = new Date(
        `${form.elements.scheduleDate.value}T${form.elements.scheduleTime.value}`,
      ).toISOString();
      if (new Date(scheduledFor) <= new Date()) {
        status.textContent = "Choose a future listing date and time.";
        return;
      }
    }
    const editingId = form.dataset.listingId;
    button.disabled = true;
    status.textContent = editingId
      ? tr("Updating NPATI listing…")
      : "Creating NPATI listing…";
    const values = (prefix) =>
      [1, 2, 3, 4, 5, 6]
        .map((n) => form.elements[`${prefix}_${n}`]?.value?.trim())
        .filter(Boolean);
    const data = {
      title: form.elements.title.value,
      description: form.elements.description.value,
      categoryId: form.elements.categoryId.value,
      price: Number(form.elements.price.value || 0),
      isFree: Boolean(form.elements.isFree.checked),
      isPost: Boolean(form.elements.isPost.checked),
      discountPrice: form.elements.discountPrice.value
        ? Number(form.elements.discountPrice.value)
        : undefined,
      currency: form.elements.currency.value,
      condition: form.elements.condition.value,
      tags: (form.elements.tags.value || "")
        .split(",")
        .filter(Boolean)
        .slice(0, 10),
      enableColors: Boolean(form.elements.enableColors.checked),
      colors: photos.map((x) => x.color || "").slice(0, 6),
      enableSizes: Boolean(form.elements.enableSizes.checked),
      sizes: values("size").map((size, index) => ({
        name: size,
        details: form.elements[`sizeDetails_${index + 1}`]?.value || "",
      })),
      phone: form.elements.phone.value || undefined,
      email: form.elements.email.value || undefined,
      disableBuy: true,
      showAuthor: Boolean(form.elements.showAuthor.checked),
      location:
        form.elements.location.value ||
        form.elements.shippingAddressId.selectedOptions[0]?.textContent ||
        "",
      country: cfg.market,
      photos: photos.map((x) => x.fileId),
      video: videos[0]?.fileId,
      thumbnail: thumbnails[0]?.fileId || photos[0]?.fileId,
      shippingAddressId: form.elements.shippingAddressId.value || undefined,
      shippingAvailable: false,
      scheduledFor,
      scheduleTimezone: scheduledFor
        ? form.elements.scheduleTimezone.value || cfg.timezone
        : undefined,
    };
    photos.slice(0, 6).forEach((photo, index) => {
      data[`photo${index + 1}Color`] = photo.color || null;
    });
    for (let index = 1; index <= 6; index++) {
      data[`size${index}`] = form.elements[`size_${index}`]?.value || null;
      data[`sizeDetails${index}`] =
        form.elements[`sizeDetails_${index}`]?.value || null;
    }
    try {
      await api(
        editingId
          ? `market/listings/${encodeURIComponent(editingId)}`
          : "market/listings",
        { method: editingId ? "PUT" : "POST", data },
      );
      state.editingListing = null;
      state.marketLoaded.active = false;
      state.marketLoaded.pending = false;
      state.marketLoaded.rejected = false;
      state.marketLoaded.listings = false;
      await loadData(true);
      navigate("market");
    } catch (e) {
      status.textContent =
        e.message ||
        (editingId
          ? tr("Unable to update listing.")
          : "Unable to create listing.");
      button.disabled = false;
    }
  }

  function calendar() {
    const y = state.calendarDate.getFullYear(),
      m = state.calendarDate.getMonth(),
      first = new Date(y, m, 1),
      start = new Date(y, m, 1 - first.getDay()),
      days = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = d.toISOString().slice(0, 10),
        jobs = state.jobs.filter(
          (j) =>
            dateOf(j) && new Date(dateOf(j)).toISOString().slice(0, 10) === key,
        ),
        articles = state.contentTasks.filter(
          (t) =>
            (t.scheduledFor || t.scheduled_for) &&
            new Date(t.scheduledFor || t.scheduled_for)
              .toISOString()
              .slice(0, 10) === key,
        );
      days.push(
        `<div class="npati-calendar-day ${d.getMonth() !== m ? "is-muted" : ""} ${d.toDateString() === new Date().toDateString() ? "is-today" : ""}"><span>${d.getDate()}</span>${jobs.map((j) => `<button class="npati-calendar-event ${j.status === "failed" ? "is-failed" : j.status === "published" ? "is-published" : ""}" data-action="edit-job" data-id="${esc(j.id)}">${esc(j.title || j.status)}</button>`).join("")}${articles
          .map((t) => {
            const status = String(t.status || "scheduled");
            return `<button class="npati-calendar-event is-article is-${esc(status)}" data-route="content"><b>Content / Article · ${esc(status)}</b> ${esc(t.title || status)}</button>`;
          })
          .join("")}</div>`,
      );
    }
    root.innerHTML = `<div class="npati-calendar-toolbar"><div><p class="npati-eyebrow">CONTENT CALENDAR</p><h2>${esc(new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(first))}</h2></div><div class="npati-calendar-controls"><button data-calendar="prev" aria-label="Previous month">${caretLeftIcon}</button><button data-calendar="today">Today</button><button data-calendar="next" aria-label="Next month">${caretRightIcon}</button></div></div><div class="npati-view-switch"><button class="active">Month</button><button>Week</button><button>Day</button><button>Agenda</button></div><div class="npati-calendar"><div class="npati-calendar-weekdays">${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((x) => `<div>${x}</div>`).join("")}</div><div class="npati-calendar-days">${days.join("")}</div></div>`;
  }
  function connections() {
    const connected = state.accounts.filter((a) => a.status === "connected");
    root.innerHTML = `<section class="npati-page-heading"><div><p class="npati-eyebrow">CONNECTIONS</p><h1>Publishing destinations</h1><p>Social credentials stay protected in NPATI Hub and are never stored in WordPress.</p></div></section><div class="npati-connected-carousel">${accountCard({ platform: "wordpress", displayName: location.host, status: "connected" })}${connected.map(accountCard).join("")}</div><div class="npati-info-banner"><strong>Connect another service</strong><p>OAuth authorization must open NPATI because Facebook, Instagram and other providers require their secure login pages. After approval you return to this WordPress workspace.</p><a class="npati-primary-button" href="https://www.npati.com/${cfg.market === "US" ? "" : cfg.market.toLowerCase() + "/"}hub/?integrations=1" target="_blank" rel="noopener">Connect service securely</a></div>`;
  }
  function contentRow(item, index) {
    const keywords = Array.isArray(item.keywords)
      ? item.keywords.join(", ")
      : item.keywords || "";
    return `<tr data-content-row="${index}"><td><input name="title" value="${esc(item.title || "")}" required></td><td><textarea name="description">${esc(item.description || "")}</textarea></td><td><input name="keywords" value="${esc(keywords)}"></td><td><input name="category" value="${esc(item.category || "")}"></td><td><input name="publish_date" type="date" value="${esc(item.publish_date || "")}"><input name="publish_time" type="time" value="${esc(item.publish_time || "")}"></td><td><input name="image_attachment_id" type="number" min="0" value="${esc(item.image_attachment_id || "")}" placeholder="Media ID"><button type="button" class="npati-secondary-button" data-action="content-image">Choose</button></td><td><label><input name="social_post" type="checkbox" ${String(item.social_post).toLowerCase() === "true" || item.social_post === "1" ? "checked" : ""}> Create</label></td></tr>`;
  }
  const contentTaskValue = (task, camel, snake) =>
    task?.[camel] ?? task?.[snake] ?? "";
  function contentDateParts(value) {
    let date = value ? new Date(value) : new Date(Date.now() + 86400000);
    if (!Number.isFinite(date.getTime()) || date.getTime() <= Date.now())
      date = new Date(Date.now() + 86400000);
    const pad = (number) => String(number).padStart(2, "0");
    return {
      date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
      time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
    };
  }
  function contentTaskPayload(container) {
    const value = (name) =>
        container.querySelector(`[name="${name}"]`)?.value?.trim() || "",
      date = value("publish_date"),
      time = value("publish_time");
    return {
      title: value("title"),
      description: value("description"),
      keywords: value("keywords")
        .split(/[,;|]/)
        .map((item) => item.trim())
        .filter(Boolean),
      category: value("category") || null,
      scheduledFor:
        date && time ? new Date(`${date}T${time}`).toISOString() : "",
      timezone: composerTimezone(),
      imageAttachmentId: Number(value("image_attachment_id")) || null,
      socialPost: Boolean(
        container.querySelector('[name="social_post"]')?.checked,
      ),
    };
  }
  function contentTaskDialog() {
    const categories = state.contentCategories
      .map(
        (category) => `<option value="${esc(category.name || "")}"></option>`,
      )
      .join("");
    return `<dialog id="npati-content-task-dialog" class="npati-content-dialog npati-article-dialog"><form id="npati-content-task-form"><header><div><p class="npati-eyebrow">CONTENT / ARTICLE</p><h2 data-content-dialog-title>Add article task</h2><span>Plan an SEO article with NPATI Hub</span></div><button type="button" data-action="close-content-dialog" aria-label="Close">${closeIcon}</button></header><div class="npati-article-dialog-layout" data-content-fields><section class="npati-article-dialog-main"><div class="npati-article-panel-heading"><strong>Article brief</strong><span>Content OpenAI will use to write the article</span></div><label><span>Title</span><input name="title" maxlength="500" placeholder="Enter the article topic or working title" required></label><label class="npati-article-description"><span>Description</span><textarea name="description" rows="8" maxlength="100000" placeholder="Describe the article, audience, tone and important points"></textarea></label><label><span>Keywords</span><input name="keywords" placeholder="seo, wordpress, content"></label></section><aside class="npati-article-dialog-side"><div class="npati-article-panel-heading"><strong>Publishing settings</strong><span>WordPress destination and schedule</span></div><label><span>Category</span><input name="category" list="npati-content-categories" maxlength="255" autocomplete="off" placeholder="Choose or type a WordPress category"><datalist id="npati-content-categories">${categories}</datalist><small class="npati-content-field-help">Choose an existing category or enter a new name.</small></label><label><span>Image</span><span class="npati-content-image-control"><input name="image_attachment_id" type="number" min="1" placeholder="Media ID"><button type="button" class="npati-secondary-button" data-action="content-image">Choose</button></span></label><div class="npati-article-date-grid"><label><span>Publish Date</span><input name="publish_date" type="date" required></label><label><span>Publish Time</span><input name="publish_time" type="time" required></label></div><label class="npati-content-social-toggle"><input name="social_post" type="checkbox"><i></i><span><strong>Create Social Post</strong><small>Prepare a social draft after publication</small></span></label></aside></div><footer><p role="status" aria-live="polite"></p><button type="button" class="npati-secondary-button" data-action="close-content-dialog">Cancel</button><button type="submit" class="npati-primary-button">Schedule article</button></footer></form></dialog>`;
  }
  function contentBulkDialog() {
    return `<dialog id="npati-content-bulk-dialog" class="npati-content-dialog npati-content-bulk-dialog"><form id="npati-content-bulk-form"><header><div><p class="npati-eyebrow">BULK ACTION</p><h2>Change publication time</h2></div><button type="button" data-action="close-content-dialog" aria-label="Close">${closeIcon}</button></header><div class="npati-content-dialog-fields"><p class="npati-content-dialog-note">The selected scheduled tasks will use the same new date and time.</p><label><span>Publish Date</span><input name="publish_date" type="date" required></label><label><span>Publish Time</span><input name="publish_time" type="time" required></label></div><footer><p role="status" aria-live="polite"></p><button type="button" class="npati-secondary-button" data-action="close-content-dialog">Cancel</button><button type="submit" class="npati-primary-button">Update schedule</button></footer></form></dialog>`;
  }
  function contentTaskCard(task) {
    const id = String(task.id),
      status = String(task.status || "scheduled"),
      editable = ["scheduled", "failed"].includes(status),
      deletable = status !== "processing",
      postId = contentTaskValue(task, "wordpressPostId", "wordpress_post_id"),
      postUrl = contentTaskValue(
        task,
        "wordpressPostUrl",
        "wordpress_post_url",
      ),
      keywords = Array.isArray(task.keywords)
        ? task.keywords.join(", ")
        : task.keywords || "",
      category = task.category || "",
      scheduled = contentTaskValue(task, "scheduledFor", "scheduled_for"),
      search = [
        task.title,
        String(task.description || "").slice(0, 500),
        keywords,
        category,
        status,
      ]
        .join(" ")
        .toLowerCase();
    return `<article data-content-task="${esc(id)}" data-search="${esc(search)}" data-status="${esc(status)}" data-day="${esc(String(scheduled).slice(0, 10))}"><label class="npati-content-select" title="Select task"><input type="checkbox" data-content-select="${esc(id)}" ${state.contentSelection.has(id) ? "checked" : ""} ${deletable ? "" : "disabled"}><span></span></label><div class="npati-content-task-main"><div class="npati-content-task-title"><span class="npati-content-status is-${esc(status)}">${esc(status)}</span><h3>${esc(task.title || "Untitled article")}</h3></div><div class="npati-content-task-meta"><span>${esc(formatDate(scheduled))}</span>${category ? `<span>${esc(category)}</span>` : ""}${keywords ? `<span title="${esc(keywords)}">${esc(keywords)}</span>` : ""}${contentTaskValue(task, "imageAttachmentId", "image_attachment_id") ? "<span>Image selected</span>" : ""}${contentTaskValue(task, "socialPost", "social_post") ? "<span>Social post</span>" : ""}</div></div><div class="npati-content-task-actions">${postId ? `<a class="npati-secondary-button" href="${esc(postUrl || "#")}" target="_blank" rel="noopener">View article</a><button class="npati-primary-button" data-action="create-social" data-post-id="${esc(postId)}">Create Social Posts</button>` : ""}${editable ? `<button class="npati-secondary-button" data-action="edit-content" data-id="${esc(id)}">Edit</button>` : ""}<button class="npati-secondary-button" data-action="duplicate-content" data-id="${esc(id)}">Duplicate</button>${deletable ? `<button class="npati-link-danger" data-action="delete-content" data-id="${esc(id)}">Delete</button>` : ""}</div></article>`;
  }
  function content() {
    if (!state.contentLoaded) {
      root.innerHTML =
        '<div class="npati-skeleton"><i></i><i></i><i></i></div>';
      return;
    }
    const tasks = state.contentTasks,
      preview = state.importPreview;
    root.innerHTML = `<section class="npati-page-heading npati-content-heading"><div><p class="npati-eyebrow">CONTENT</p><h1>WordPress Articles</h1><p>Import, create and schedule SEO articles with the existing NPATI Hub scheduler.</p></div><button class="npati-primary-button npati-add-content" data-action="add-content">+ Add article</button></section><section class="npati-card npati-content-import"><div><h2>Import Content Tasks</h2><p class="description">CSV or XLSX, up to 5 MB and 5,000 rows. Preview is processed in pages of 100.</p><p class="description">Dates: YYYY-MM-DD. Time: HH:MM. Image: WordPress Media Library attachment ID. Social Post: true or false.</p></div><div class="npati-content-import-actions"><a class="npati-secondary-button" href="${esc(cfg.contentSampleUrl || "#")}" download="npati-content-tasks-sample.csv">Download CSV sample</a><form id="npati-import-form"><input name="file" type="file" accept=".csv,.xlsx" required><button class="npati-primary-button npati-preview-file-button">Preview file</button><p role="status"></p></form></div></section>${preview ? `<section class="npati-card npati-content-preview"><div class="npati-content-section-head"><div><h2>Import preview</h2><p>${preview.offset + 1}-${Math.min(preview.offset + preview.items.length, preview.total)} of ${preview.total}</p></div><button class="npati-primary-button npati-save-content-page" data-action="save-content-page">Save these tasks</button></div><div class="npati-table-scroll"><table><thead><tr><th>Title</th><th>Description</th><th>Keywords</th><th>Category</th><th>Publish</th><th>Image</th><th>Social Post</th></tr></thead><tbody>${preview.items.map(contentRow).join("")}</tbody></table></div><div class="npati-inline-actions"><button class="npati-secondary-button" data-action="import-prev" ${preview.offset ? "" : "disabled"}>Previous</button><button class="npati-secondary-button" data-action="import-next" ${preview.offset + preview.items.length < preview.total ? "" : "disabled"}>Next</button></div></section>` : ""}<section class="npati-card npati-content-planner"><div class="npati-content-section-head"><div><h2>Content Planner</h2><p>Content / Article tasks stored and scheduled in NPATI Hub.</p></div><span class="npati-content-count"><b data-content-visible>${tasks.length}</b> / ${tasks.length}</span></div><div class="npati-content-filters"><label class="npati-content-search"><span class="screen-reader-text">Search articles</span><input type="search" data-content-search placeholder="Search title, description, keyword or category"></label><label><span class="screen-reader-text">Filter status</span><select data-content-status><option value="">All statuses</option>${["scheduled", "processing", "published", "failed", "cancelled"].map((status) => `<option value="${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</option>`).join("")}</select></label><label><span class="screen-reader-text">Filter publication day</span><input type="date" data-content-day></label><button class="npati-secondary-button" data-action="clear-content-filters">Clear</button></div><div class="npati-content-bulk"><label><input type="checkbox" data-content-select-all> Select visible</label><span><b data-content-selected>${state.contentSelection.size}</b> selected</span><button class="npati-secondary-button" data-action="bulk-reschedule" ${state.contentSelection.size ? "" : "disabled"}>Change date & time</button><button class="npati-link-danger" data-action="bulk-delete-content" ${state.contentSelection.size ? "" : "disabled"}>Delete selected</button></div><div class="npati-content-task-list">${tasks.length ? tasks.map(contentTaskCard).join("") : empty("No article tasks", "Import a file or add an article manually.")}</div><div class="npati-content-filter-empty" hidden>No tasks match these filters.</div></section>${contentTaskDialog()}${contentBulkDialog()}`;
    bindContentForms();
    applyContentFilters();
    updateContentBulk();
  }
  function applyContentFilters() {
    const query = (document.querySelector("[data-content-search]")?.value || "")
        .trim()
        .toLowerCase(),
      status = document.querySelector("[data-content-status]")?.value || "",
      day = document.querySelector("[data-content-day]")?.value || "";
    let visible = 0;
    document.querySelectorAll("[data-content-task]").forEach((card) => {
      const show =
        (!query || card.dataset.search.includes(query)) &&
        (!status || card.dataset.status === status) &&
        (!day || card.dataset.day === day);
      card.hidden = !show;
      if (show) visible++;
    });
    const count = document.querySelector("[data-content-visible]");
    if (count) count.textContent = String(visible);
    const emptyNode = document.querySelector(".npati-content-filter-empty");
    if (emptyNode)
      emptyNode.hidden = visible > 0 || state.contentTasks.length === 0;
    const selectAll = document.querySelector("[data-content-select-all]");
    if (selectAll) {
      const selectable = [
        ...document.querySelectorAll(
          "[data-content-task]:not([hidden]) [data-content-select]:not(:disabled)",
        ),
      ];
      selectAll.checked =
        Boolean(selectable.length) &&
        selectable.every((input) => input.checked);
      selectAll.indeterminate =
        selectable.some((input) => input.checked) && !selectAll.checked;
    }
  }
  function updateContentBulk() {
    const selected = [...state.contentSelection],
      tasks = selected
        .map((id) => state.contentTasks.find((task) => String(task.id) === id))
        .filter(Boolean),
      reschedule = document.querySelector('[data-action="bulk-reschedule"]'),
      remove = document.querySelector('[data-action="bulk-delete-content"]');
    const count = document.querySelector("[data-content-selected]");
    if (count) count.textContent = String(tasks.length);
    if (reschedule)
      reschedule.disabled =
        !tasks.length ||
        tasks.some((task) => !["scheduled", "failed"].includes(task.status));
    if (remove)
      remove.disabled =
        !tasks.length || tasks.some((task) => task.status === "processing");
    applyContentFilters();
  }
  function openContentEditor(task = null, mode = "create") {
    const dialog = document.getElementById("npati-content-task-dialog"),
      form = document.getElementById("npati-content-task-form"),
      parts = contentDateParts(
        contentTaskValue(task, "scheduledFor", "scheduled_for"),
      );
    form.dataset.mode = mode;
    form.dataset.id = mode === "edit" ? String(task?.id || "") : "";
    form.querySelector("[data-content-dialog-title]").textContent =
      mode === "edit"
        ? "Edit article task"
        : mode === "duplicate"
          ? "Duplicate article task"
          : "Add article task";
    form.elements.title.value = task?.title || "";
    form.elements.description.value = task?.description || "";
    form.elements.keywords.value = Array.isArray(task?.keywords)
      ? task.keywords.join(", ")
      : task?.keywords || "";
    form.elements.category.value = task?.category || "";
    form.elements.image_attachment_id.value =
      contentTaskValue(task, "imageAttachmentId", "image_attachment_id") || "";
    form.elements.publish_date.value = parts.date;
    form.elements.publish_time.value = parts.time;
    form.elements.social_post.checked = Boolean(
      contentTaskValue(task, "socialPost", "social_post"),
    );
    form.querySelector("[role=status]").textContent = "";
    dialog.showModal();
    requestAnimationFrame(() => form.elements.title.focus());
  }
  function bindContentForms() {
    document
      .getElementById("npati-import-form")
      ?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.currentTarget,
          status = form.querySelector("[role=status]"),
          data = new FormData(form);
        status.textContent = "Reading file...";
        try {
          const response = await fetch(`${cfg.restUrl}content/import`, {
            method: "POST",
            headers: { "X-WP-Nonce": cfg.nonce },
            body: data,
          });
          const payload = await response.json();
          if (!response.ok) throw new Error(payload.message || "Import failed");
          state.importPreview = { ...payload, offset: 0 };
          content();
        } catch (error) {
          status.textContent = error.message;
        }
      });
    document
      .getElementById("npati-content-task-form")
      ?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.currentTarget,
          status = form.querySelector("[role=status]"),
          submit = form.querySelector('[type="submit"]'),
          payload = contentTaskPayload(form);
        if (
          !payload.scheduledFor ||
          new Date(payload.scheduledFor).getTime() <= Date.now()
        ) {
          status.textContent = "Choose a future publication date and time.";
          return;
        }
        submit.disabled = true;
        status.textContent =
          form.dataset.mode === "edit"
            ? "Saving changes..."
            : "Scheduling article...";
        try {
          if (form.dataset.mode === "edit")
            await api(`content/tasks/${form.dataset.id}`, {
              method: "PATCH",
              data: payload,
            });
          else
            await api("content/tasks", {
              method: "POST",
              data: { items: [payload] },
            });
          form.closest("dialog").close();
          await loadContentData(true);
          content();
        } catch (error) {
          status.textContent = error.message || "Unable to save article task.";
          submit.disabled = false;
        }
      });
    document
      .getElementById("npati-content-bulk-form")
      ?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.currentTarget,
          status = form.querySelector("[role=status]"),
          submit = form.querySelector('[type="submit"]'),
          date = form.elements.publish_date.value,
          time = form.elements.publish_time.value,
          scheduledFor =
            date && time ? new Date(`${date}T${time}`).toISOString() : "";
        if (!scheduledFor || new Date(scheduledFor).getTime() <= Date.now()) {
          status.textContent = "Choose a future publication date and time.";
          return;
        }
        submit.disabled = true;
        status.textContent = "Updating selected tasks...";
        try {
          await api("content/tasks/batch", {
            method: "PATCH",
            data: {
              ids: [...state.contentSelection],
              scheduledFor,
              timezone: composerTimezone(),
            },
          });
          form.closest("dialog").close();
          state.contentSelection.clear();
          await loadContentData(true);
          content();
        } catch (error) {
          status.textContent =
            error.message || "Unable to update selected tasks.";
          submit.disabled = false;
        }
      });
    document
      .querySelectorAll(
        "[data-content-search],[data-content-status],[data-content-day]",
      )
      .forEach((control) =>
        control.addEventListener(
          control.type === "search" ? "input" : "change",
          applyContentFilters,
        ),
      );
    document
      .querySelector("[data-content-select-all]")
      ?.addEventListener("change", (event) => {
        document
          .querySelectorAll(
            "[data-content-task]:not([hidden]) [data-content-select]:not(:disabled)",
          )
          .forEach((input) => {
            input.checked = event.currentTarget.checked;
            if (input.checked)
              state.contentSelection.add(input.dataset.contentSelect);
            else state.contentSelection.delete(input.dataset.contentSelect);
          });
        updateContentBulk();
      });
    document.querySelectorAll("[data-content-select]").forEach((input) =>
      input.addEventListener("change", () => {
        if (input.checked)
          state.contentSelection.add(input.dataset.contentSelect);
        else state.contentSelection.delete(input.dataset.contentSelect);
        updateContentBulk();
      }),
    );
  }
  function render() {
    updateShell();
    if (state.route === "market") return market();
    if (state.route === "market/create") return listingForm();
    if (state.route === "content") return content();
    if (state.route === "hub/create") return composer();
    if (state.route === "hub/calendar") return calendar();
    if (state.route === "hub/connections") return connections();
    return overview();
  }

  document.addEventListener(
    "click",
    (event) => {
      const control = event.target.closest?.("[data-action]");
      if (
        !control ||
        ![
          "filter-publications-by-date",
          "clear-activity-filter",
          "set-publication-view",
          "connections-prev",
          "connections-next",
          "publication-media-prev",
          "publication-media-next",
        ].includes(control.dataset.action)
      )
        return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (
        control.dataset.action === "connections-prev" ||
        control.dataset.action === "connections-next"
      ) {
        document.querySelector(".npati-connected-carousel")?.scrollBy({
          left: control.dataset.action === "connections-next" ? 162 : -162,
          behavior: "smooth",
        });
        return;
      }
      if (
        control.dataset.action === "publication-media-prev" ||
        control.dataset.action === "publication-media-next"
      ) {
        const media = control.closest(".npati-scheduled-media"),
          slides = [...media.querySelectorAll(".npati-scheduled-slide")],
          current = slides.findIndex((slide) =>
            slide.classList.contains("active"),
          ),
          next =
            (current +
              (control.dataset.action === "publication-media-next" ? 1 : -1) +
              slides.length) %
            slides.length;
        if (!slides.length) return;
        slides[current]?.classList.remove("active");
        slides[next].classList.add("active");
        media.querySelector(".npati-scheduled-slides").dataset.slideIndex =
          String(next);
        media.querySelector(".npati-scheduled-count").textContent =
          `${next + 1} / ${slides.length}`;
        return;
      }
      if (control.dataset.action === "filter-publications-by-date") {
        state.publicationView = "archive";
        state.archiveDateFilter = control.dataset.date;
      } else if (control.dataset.action === "clear-activity-filter") {
        state.publicationView = "archive";
        state.archiveDateFilter = null;
      } else {
        state.publicationView =
          control.dataset.view === "archive" ? "archive" : "scheduled";
        state.archiveDateFilter = null;
      }
      overview();
      requestAnimationFrame(() =>
        document
          .querySelector(".npati-publications")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    },
    true,
  );
  document.addEventListener(
    "keydown",
    (event) => {
      const activity = event.target.closest?.(
          '[data-action="filter-publications-by-date"]',
        ),
        connection = event.target.closest?.(
          ".npati-connection-card[data-route]",
        );
      if (!activity && !connection) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      if (activity) activity.click();
      else navigate(connection.dataset.route);
    },
    true,
  );

  document.addEventListener(
    "click",
    (event) => {
      const el = event.target.closest?.("[data-action]");
      if (
        !el ||
        ![
          "toggle-category-picker",
          "toggle-category-group",
          "select-listing-category",
          "clear-listing-category",
        ].includes(el.dataset.action)
      )
        return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const picker = el.closest(".npati-category-picker"),
        menu = picker?.querySelector(".npati-category-menu");
      if (el.dataset.action === "toggle-category-picker") {
        menu.hidden = !menu.hidden;
        el.setAttribute("aria-expanded", String(!menu.hidden));
        picker.classList.toggle("is-open", !menu.hidden);
      } else if (el.dataset.action === "toggle-category-group") {
        const children = el
          .closest(".npati-category-group")
          ?.querySelector(".npati-category-children");
        children.hidden = !children.hidden;
        el.classList.toggle("is-expanded", !children.hidden);
      } else {
        const form = el.closest("form");
        form.elements.categoryId.value =
          el.dataset.action === "clear-listing-category" ? "" : el.dataset.id;
        menu.hidden = true;
        picker.classList.remove("is-open");
        picker
          .querySelector(".npati-category-control")
          .setAttribute("aria-expanded", "false");
        syncCreateProductForm(form);
        updateProductPreview(form);
      }
    },
    true,
  );

  document.addEventListener(
    "click",
    (event) => {
      const control = event.target.closest?.(
        '[data-action="toggle-preview-like"],[data-action="preview-media-prev"],[data-action="preview-media-next"],[data-action="preview-media-dot"]',
      );
      if (!control) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const form = control.closest("form"),
        mediaNode = form?.querySelector(".npati-preview-media");
      if (!form || !mediaNode) return;
      if (control.dataset.action === "toggle-preview-like")
        mediaNode.dataset.liked = mediaNode.dataset.liked === "1" ? "0" : "1";
      else {
        const count =
            listingMediaByRole("photo").length +
            (listingMediaByRole("video").length
              ? 1
              : !listingMediaByRole("photo").length &&
                  listingMediaByRole("thumbnail").length
                ? 1
                : 0),
          current = Number(mediaNode.dataset.previewIndex) || 0;
        mediaNode.dataset.previewIndex = String(
          control.dataset.action === "preview-media-dot"
            ? Number(control.dataset.index)
            : (current +
                (control.dataset.action === "preview-media-next" ? 1 : -1) +
                count) %
                count,
        );
      }
      updateProductPreview(form);
    },
    true,
  );

  document.addEventListener(
    "click",
    (event) => {
      const el = event.target.closest?.("[data-action]");
      if (
        !el ||
        ![
          "add-listing-tag",
          "remove-listing-tag",
          "remove-listing-upload",
          "toggle-listing-schedule",
          "schedule-cancel",
          "schedule-confirm",
          "schedule-month-prev",
          "schedule-month-next",
          "schedule-day",
        ].includes(el.dataset.action)
      )
        return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const form = el.closest("form");
      if (el.dataset.action === "add-listing-tag") {
        const input = form.elements.tagInput,
          tags = (form.elements.tags.value || "").split(",").filter(Boolean);
        if (
          input.value.trim() &&
          tags.length < 10 &&
          !tags.includes(input.value.trim())
        )
          tags.push(input.value.trim());
        form.elements.tags.value = tags.join(",");
        input.value = "";
        renderListingTags(form);
      } else if (el.dataset.action === "remove-listing-tag") {
        const tags = (form.elements.tags.value || "")
          .split(",")
          .filter(Boolean);
        tags.splice(Number(el.dataset.index), 1);
        form.elements.tags.value = tags.join(",");
        renderListingTags(form);
      } else if (el.dataset.action === "remove-listing-upload") {
        const role = el.dataset.role,
          item = listingMediaByRole(role)[Number(el.dataset.index)];
        revokeListingPreview(item);
        if (role === "video") {
          listingMediaByRole("thumbnail").forEach(revokeListingPreview);
          state.listingMedia = state.listingMedia.filter(
            (media) => !["video", "thumbnail"].includes(media.role),
          );
        } else {
          const index = state.listingMedia.indexOf(item);
          if (index >= 0) state.listingMedia.splice(index, 1);
        }
        for (const redrawRole of role === "video"
          ? ["video", "thumbnail"]
          : [role]) {
          const node = document.getElementById(
            `npati-listing-${redrawRole === "photo" ? "photos" : redrawRole}`,
          );
          if (node) node.innerHTML = listingUploadArea(redrawRole);
        }
        syncCreateProductForm(form);
        updateProductPreview(form);
      } else if (el.dataset.action === "toggle-listing-schedule") {
        state.scheduleCalendarDate = new Date();
        const modal = form.querySelector(".npati-schedule-modal");
        modal.hidden = false;
        document.body.classList.add("npati-schedule-open");
        form.elements.scheduleEnabled.checked = true;
        form.querySelector(".npati-schedule-calendar").innerHTML =
          scheduleCalendarMarkup(form.elements.scheduleDate.value);
      } else if (el.dataset.action === "schedule-cancel") {
        form.querySelector(".npati-schedule-modal").hidden = true;
        document.body.classList.remove("npati-schedule-open");
        form.elements.scheduleEnabled.checked = false;
        form.querySelector(".npati-schedule-error").textContent = "";
      } else if (el.dataset.action === "schedule-day") {
        form.elements.scheduleDate.value = el.dataset.date;
        form.querySelector(".npati-schedule-calendar").innerHTML =
          scheduleCalendarMarkup(el.dataset.date);
      } else if (
        el.dataset.action === "schedule-month-prev" ||
        el.dataset.action === "schedule-month-next"
      ) {
        const base = state.scheduleCalendarDate || new Date();
        state.scheduleCalendarDate = new Date(
          base.getFullYear(),
          base.getMonth() +
            (el.dataset.action === "schedule-month-next" ? 1 : -1),
          1,
        );
        form.querySelector(".npati-schedule-calendar").innerHTML =
          scheduleCalendarMarkup(form.elements.scheduleDate.value);
      } else {
        const error = form.querySelector(".npati-schedule-error"),
          date = form.elements.scheduleDate.value,
          time = form.elements.scheduleTime.value;
        if (!date || !time || new Date(`${date}T${time}`) <= new Date()) {
          error.textContent = listingText(
            "Choose a future listing date and time.",
            "Оберіть майбутню дату й час публікації.",
          );
          return;
        }
        error.textContent = "";
        form.querySelector(".npati-schedule-modal").hidden = true;
        document.body.classList.remove("npati-schedule-open");
        form.requestSubmit();
      }
    },
    true,
  );

  function composerAttachmentMime(item) {
    const raw = String(item?.mime || item?.mime_type || "").toLowerCase();
    if (raw.includes("/")) return raw;
    const type = String(item?.type || raw || "").toLowerCase(),
      subtype = String(item?.subtype || "").toLowerCase();
    return type && subtype ? `${type}/${subtype}` : type;
  }
  function composerAttachmentUrl(item) {
    return (
      item?.url ||
      item?.source_url ||
      item?.sizes?.full?.url ||
      item?.image?.src ||
      ""
    );
  }
  async function importComposerMedia(selection) {
    const allowed =
        /^(image\/(jpeg|png|webp|gif)|video\/(mp4|quicktime|webm))$/,
      items = selection
        .map((item) => ({
          ...item,
          _mime: composerAttachmentMime(item),
          _url: composerAttachmentUrl(item),
        }))
        .filter((item) => item._url),
      unsupported = items.find((item) => !allowed.test(item._mime));
    if (unsupported) {
      renderComposerUploadArea(
        "Choose JPEG, PNG, WebP, GIF, MP4, MOV or WebM media.",
      );
      return;
    }
    const oversized = items.find(
      (item) =>
        Number(item.filesizeInBytes || item.filesize_bytes || 0) > 262144000,
    );
    if (oversized) {
      renderComposerUploadArea("The selected video must be 250 MB or smaller.");
      return;
    }
    const videos = items.filter((item) => item._mime.startsWith("video/")),
      images = items.filter((item) => item._mime.startsWith("image/"));
    if (videos.length && images.length) {
      renderComposerUploadArea(
        "Choose either photos or one video, not both in the same publication.",
      );
      return;
    }
    let selected;
    if (videos.length) {
      selected = videos.slice(0, 1);
      state.composerMedia = [];
    } else {
      if (
        state.composerMedia.some((item) =>
          String(item.mimeType || item.mime_type || "").startsWith("video/"),
        )
      )
        state.composerMedia = [];
      selected = images.slice(0, Math.max(0, 6 - state.composerMedia.length));
    }
    if (!selected.length) {
      renderComposerUploadArea("You can add up to 6 photos or 1 video.");
      return;
    }
    const pending = selected.map((item) => ({
      attachmentId: item.id,
      previewUrl: item._url,
      coverUrl: item.image?.src || item.thumb?.src || "",
      publicUrl: "",
      mimeType: item._mime,
      pending: true,
      uploadId: createUuid(),
    }));
    state.composerMedia.push(...pending);
    renderComposerUploadArea();
    for (const media of pending) {
      try {
        const result = await api("hub/media/import", {
          method: "POST",
          data: { attachmentId: media.attachmentId },
        });
        Object.assign(media, result, {
          publicUrl: result.publicUrl || result.public_url,
          previewUrl:
            media.previewUrl ||
            result.previewUrl ||
            result.preview_url ||
            result.publicUrl ||
            result.public_url,
          mimeType: result.mimeType || result.mime_type || media.mimeType,
          pending: false,
        });
        renderComposerUploadArea();
      } catch (error) {
        state.composerMedia = state.composerMedia.filter(
          (item) => item !== media && !(pending.includes(item) && item.pending),
        );
        renderComposerUploadArea(
          error?.message || "The media file could not be transferred to NPATI.",
        );
        return;
      }
    }
  }
  function openMediaPicker(target, multiple) {
    const listingRole =
        target === "listing-photos"
          ? "photo"
          : target === "listing-video"
            ? "video"
            : target === "listing-thumbnail"
              ? "thumbnail"
              : target === "listing"
                ? "mixed"
                : null,
      isListing = Boolean(listingRole),
      library =
        listingRole === "video"
          ? { type: "video" }
          : listingRole
            ? { type: "image" }
            : { type: ["image", "video"] },
      frame = wp.media({
        title: isListing
          ? listingText("Choose product media", "Виберіть медіа товару")
          : "Choose media",
        button: {
          text: listingText("Use selected media", "Використати вибрані медіа"),
        },
        multiple,
        library,
      });
    frame.on("select", async () => {
      const selection = frame.state().get("selection").toJSON();
      if (!isListing) {
        await importComposerMedia(selection);
        return;
      }
      const limit =
          listingRole === "photo"
            ? Math.max(0, 6 - listingMediaByRole("photo").length)
            : 1,
        selected = selection.slice(0, limit),
        container = document.getElementById(
          `npati-listing-${listingRole === "mixed" ? "photos" : listingRole}`,
        );
      try {
        if (isListing && listingRole !== "photo") {
          const replacedRoles =
            listingRole === "video" ? ["video", "thumbnail"] : [listingRole];
          state.listingMedia
            .filter((item) => replacedRoles.includes(item.role))
            .forEach(revokeListingPreview);
          state.listingMedia = state.listingMedia.filter(
            (item) => !replacedRoles.includes(item.role),
          );
        }
        for (let i = 0; i < selected.length; i++) {
          const selectedItem = selected[i],
            selectedMime = selectedItem.mime || selectedItem.mime_type || "",
            selectedUrl =
              selectedItem.url ||
              selectedItem.source_url ||
              selectedItem.sizes?.full?.url ||
              "",
            selectedRole =
              listingRole === "mixed"
                ? String(selectedMime).startsWith("video/")
                  ? "video"
                  : "photo"
                : listingRole;
          let optimisticItem = null,
            thumbnailPromise = null;
          if (isListing && selectedRole === "video" && selectedUrl) {
            optimisticItem = {
              fileId: null,
              previewUrl: selectedUrl,
              publicUrl: selectedUrl,
              mimeType: selectedMime || "video/mp4",
              role: "video",
              pending: true,
            };
            state.listingMedia.push(optimisticItem);
            container.innerHTML = listingUploadArea("video");
            updateProductPreview(document.getElementById("npati-listing-form"));
            const thumbnailNode = document.getElementById(
              "npati-listing-thumbnail",
            );
            if (thumbnailNode)
              thumbnailNode.innerHTML = `<p class="npati-upload-progress">${esc(listingText("Creating video thumbnail…", "Створення мініатюри відео…"))}</p>`;
            thumbnailPromise = createAutomaticListingThumbnail(
              optimisticItem,
            ).catch((error) => {
              console.warn(
                "[NPATI Hub] Automatic video thumbnail failed",
                error,
              );
              if (thumbnailNode)
                thumbnailNode.innerHTML = listingUploadArea("thumbnail");
              return null;
            });
          }
          const result = await api(
            isListing ? "market/media/import" : "hub/media/import",
            { method: "POST", data: { attachmentId: selectedItem.id } },
          );
          if (isListing) {
            const role = selectedRole,
              mediaItem = optimisticItem || { ...result, role };
            if (optimisticItem)
              Object.assign(optimisticItem, result, {
                role,
                previewUrl:
                  selectedUrl || result.previewUrl || result.publicUrl,
                pending: false,
              });
            else state.listingMedia.push(mediaItem);
            if (
              role === "video" &&
              !thumbnailPromise &&
              !listingMediaByRole("thumbnail").length
            )
              thumbnailPromise = createAutomaticListingThumbnail(
                mediaItem,
              ).catch((error) => {
                console.warn(
                  "[NPATI Hub] Automatic video thumbnail failed",
                  error,
                );
                const thumbnailNode = document.getElementById(
                  "npati-listing-thumbnail",
                );
                if (thumbnailNode)
                  thumbnailNode.innerHTML = listingUploadArea("thumbnail");
                return null;
              });
            if (thumbnailPromise)
              try {
                await thumbnailPromise;
              } catch (error) {
                console.warn(
                  "[NPATI Hub] Automatic video thumbnail failed",
                  error,
                );
              }
          } else
            state.composerMedia.push({
              ...result,
              publicUrl: result.publicUrl || result.public_url,
              mimeType: result.mimeType || result.mime_type,
            });
        }
        if (isListing) {
          for (const role of ["photo", "video", "thumbnail"]) {
            const node = document.getElementById(
              `npati-listing-${role === "photo" ? "photos" : role}`,
            );
            if (node) node.innerHTML = listingUploadArea(role);
          }
          const form = document.getElementById("npati-listing-form");
          syncCreateProductForm(form);
          updateProductPreview(form);
        } else container.innerHTML = mediaPreview(state.composerMedia, target);
      } catch (e) {
        container.innerHTML = errorPanel(e);
      }
    });
    frame.open();
  }
  document.addEventListener("click", async (event) => {
    const el = event.target.closest(
      "[data-route],[data-action],[data-calendar],[data-source],[data-market-tab]",
    );
    if (!el) return;
    if (el.dataset.action === "toggle-listing-like") {
      event.preventDefault();
      event.stopPropagation();
      await toggleListingLike(el);
      return;
    }
    if (el.dataset.action === "listing-video-toggle") {
      event.preventDefault();
      event.stopPropagation();
      const video = el
        .closest(".npati-listing-card")
        ?.querySelector("video.npati-listing-slide.is-active");
      if (video) {
        if (video.paused) playListingVideo(video);
        else video.pause();
      }
      return;
    }
    if (el.dataset.action === "listing-video-sound") {
      event.preventDefault();
      event.stopPropagation();
      const video = el
        .closest(".npati-listing-card")
        ?.querySelector("video.npati-listing-slide.is-active");
      if (video) {
        video.muted = !video.muted;
        el.closest("[data-video-ui]")?.classList.toggle(
          "is-audible",
          !video.muted,
        );
        el.setAttribute("aria-label", video.muted ? "Unmute" : "Mute");
      }
      return;
    }
    if (
      el.dataset.action === "listing-media-prev" ||
      el.dataset.action === "listing-media-next" ||
      el.dataset.action === "listing-media-dot"
    ) {
      event.preventDefault();
      event.stopPropagation();
      const card = el.closest(".npati-listing-card"),
        current = Number(card?.dataset.currentSlide) || 0;
      changeListingSlide(
        card,
        el.dataset.action === "listing-media-dot"
          ? Number(el.dataset.index)
          : current + (el.dataset.action === "listing-media-next" ? 1 : -1),
      );
      return;
    }
    if (el.dataset.marketTab) {
      state.marketTab = el.dataset.marketTab;
      await loadMarketStatus(marketTabs[state.marketTab].status);
      return;
    }
    if (el.dataset.route) {
      event.preventDefault();
      navigate(el.dataset.route);
      return;
    }
    if (el.dataset.source) {
      const form = el.closest("form");
      form
        .querySelectorAll("[data-source]")
        .forEach((button) => button.classList.toggle("active", button === el));
      form
        .querySelectorAll("[data-source-panel]")
        .forEach(
          (panel) =>
            (panel.hidden = panel.dataset.sourcePanel !== el.dataset.source),
        );
      return;
    }
    if (el.dataset.calendar) {
      if (el.dataset.calendar === "today") state.calendarDate = new Date();
      else
        state.calendarDate.setMonth(
          state.calendarDate.getMonth() +
            (el.dataset.calendar === "next" ? 1 : -1),
        );
      calendar();
      return;
    }
    if (el.dataset.action === "pick-media") {
      openMediaPicker(el.dataset.target, el.dataset.multiple === "1");
      return;
    }
    if (el.dataset.action === "remove-media") {
      const list =
        el.dataset.target === "listing"
          ? state.listingMedia
          : state.composerMedia;
      list.splice(Number(el.dataset.index), 1);
      if (el.dataset.target === "listing") {
        const container = document.getElementById("npati-listing-media");
        if (container)
          container.innerHTML = mediaPreview(list, el.dataset.target);
        updateProductPreview(document.getElementById("npati-listing-form"));
      } else renderComposerUploadArea();
      return;
    }
    if (el.dataset.action === "repost-listing") {
      navigate("hub/create");
      setTimeout(() => {
        const radio = document.querySelector(
          `input[name=listing][value="${CSS.escape(el.dataset.id)}"]`,
        );
        if (radio) {
          radio.checked = true;
          radio.dispatchEvent(new Event("change"));
        }
      }, 0);
      return;
    }
    if (el.dataset.action === "edit-job") {
      const job = state.jobs.find(
        (j) => String(j.id) === String(el.dataset.id),
      );
      state.composerMedia = [];
      navigate("hub/create");
      setTimeout(() => composer(job), 0);
      return;
    }
    if (el.dataset.action === "market-retry") {
      await loadMarketStatus(marketTabs[state.marketTab].status, true);
      return;
    }
    if (el.dataset.action === "reload") {
      invalidateWorkspaceCache();
      await loadData(true);
      render();
      return;
    }
    if (["cancel", "retry"].includes(el.dataset.action)) {
      if (
        el.dataset.action === "cancel" &&
        !confirm(tr("Cancel this scheduled publication?"))
      )
        return;
      el.disabled = true;
      try {
        await api(
          `hub/posts/${el.dataset.id}${el.dataset.action === "retry" ? "/retry" : ""}`,
          { method: el.dataset.action === "retry" ? "POST" : "DELETE" },
        );
        invalidateWorkspaceCache();
        await loadData(true);
        render();
      } catch (e) {
        alert(e.message || tr("Action failed"));
        el.disabled = false;
      }
    }
  });
  document.addEventListener(
    "click",
    (event) => {
      const close = event.target.closest('[data-action="close-video-viewer"]');
      if (
        close &&
        (event.target === close ||
          close.classList.contains("npati-video-viewer-close"))
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeMarketVideo();
        return;
      }
      const card = event.target.closest('[data-action="open-market-video"]');
      if (card && !event.target.closest("a,button")) {
        event.preventDefault();
        event.stopImmediatePropagation();
        openMarketVideo(card.dataset.videoId);
      }
    },
    true,
  );
  function findListing(id) {
    return Object.values(state.marketContent)
      .flat()
      .find(
        (item) => item.type === "listing" && String(item.id) === String(id),
      );
  }
  function closeListingMenus(except) {
    document.querySelectorAll(".npati-listing-actions-menu").forEach((menu) => {
      if (menu === except) return;
      menu.hidden = true;
      menu.previousElementSibling?.setAttribute("aria-expanded", "false");
    });
  }
  document.addEventListener(
    "click",
    async (event) => {
      const control = event.target.closest?.('[data-action="share-listing"]');
      if (!control) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      closeListingMenus();
      const item = findListing(control.dataset.id);
      if (!item) return;
      const url = item.linkUrl || item.url || "";
      if (navigator.share) {
        try {
          await navigator.share({ title: item.title || "NPATI", url });
          return;
        } catch (error) {
          if (error?.name === "AbortError") return;
        }
      }
      if (url && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        return;
      }
      if (url) window.open(url, "_blank", "noopener");
    },
    true,
  );
  document.addEventListener(
    "click",
    async (event) => {
      const action = event.target.closest?.("[data-action]")?.dataset.action;
      if (
        !["toggle-listing-menu", "edit-listing", "delete-listing"].includes(
          action || "",
        )
      ) {
        closeListingMenus();
        if (
          event.target.closest?.(
            '[data-route="market/create"],[data-route="market"]',
          )
        )
          state.editingListing = null;
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      const control = event.target.closest("[data-action]"),
        item = findListing(control.dataset.id);
      if (action === "toggle-listing-menu") {
        const menu = control.nextElementSibling,
          opening = menu.hidden;
        closeListingMenus(menu);
        menu.hidden = !opening;
        control.setAttribute("aria-expanded", opening ? "true" : "false");
        return;
      }
      closeListingMenus();
      if (!item) return;
      if (action === "edit-listing") {
        state.editingListing = item;
        navigate("market/create");
        return;
      }
      if (!confirm(tr("Delete this listing? This action cannot be undone.")))
        return;
      control.disabled = true;
      try {
        await api(`market/listings/${encodeURIComponent(item.id)}`, {
          method: "DELETE",
        });
        Object.keys(state.marketContent).forEach((status) => {
          state.marketContent[status] = state.marketContent[status].filter(
            (entry) => String(entry.id) !== String(item.id),
          );
        });
        state.listings = state.listings.filter(
          (entry) => String(entry.id) !== String(item.id),
        );
        market();
      } catch (error) {
        control.disabled = false;
        alert(error.message || tr("Unable to delete listing."));
      }
    },
    true,
  );
  document.addEventListener(
    "click",
    async (event) => {
      const button = event.target.closest?.("[data-action]");
      if (!button) return;
      const action = button.dataset.action;
      if (
        ![
          "add-content",
          "edit-content",
          "duplicate-content",
          "close-content-dialog",
          "clear-content-filters",
          "bulk-reschedule",
          "bulk-delete-content",
          "import-prev",
          "import-next",
          "save-content-page",
          "content-image",
          "delete-content",
          "create-social",
        ].includes(action)
      )
        return;
      event.preventDefault();
      event.stopImmediatePropagation();
      try {
        if (action === "close-content-dialog") {
          button.closest("dialog")?.close();
          return;
        }
        if (action === "add-content") {
          openContentEditor();
          return;
        }
        if (action === "edit-content" || action === "duplicate-content") {
          const task = state.contentTasks.find(
            (item) => String(item.id) === String(button.dataset.id),
          );
          if (task)
            openContentEditor(
              task,
              action === "edit-content" ? "edit" : "duplicate",
            );
          return;
        }
        if (action === "clear-content-filters") {
          document.querySelector("[data-content-search]").value = "";
          document.querySelector("[data-content-status]").value = "";
          document.querySelector("[data-content-day]").value = "";
          applyContentFilters();
          return;
        }
        if (action === "bulk-reschedule") {
          const parts = contentDateParts();
          const form = document.getElementById("npati-content-bulk-form");
          form.elements.publish_date.value = parts.date;
          form.elements.publish_time.value = parts.time;
          form.querySelector("[role=status]").textContent = "";
          document.getElementById("npati-content-bulk-dialog").showModal();
          return;
        }
        if (action === "bulk-delete-content") {
          if (
            !confirm(
              `Delete ${state.contentSelection.size} selected Content tasks? Published WordPress articles will not be deleted.`,
            )
          )
            return;
          button.disabled = true;
          await api("content/tasks/batch", {
            method: "DELETE",
            data: { ids: [...state.contentSelection] },
          });
          state.contentSelection.clear();
          await loadContentData(true);
          content();
          return;
        }
        if (action === "content-image") {
          const fields = button.closest("[data-content-fields], tr"),
            parentDialog = button.closest("dialog");
          if (!window.wp?.media)
            throw new Error("WordPress Media Library is unavailable.");
          const frame = wp.media({
            title: "Choose article image",
            button: { text: "Use this image" },
            multiple: false,
            library: { type: "image" },
          });
          if (parentDialog?.open) parentDialog.close();
          frame.on("select", () => {
            const attachment = frame.state().get("selection").first()?.toJSON();
            if (attachment?.id)
              fields.querySelector("[name=image_attachment_id]").value =
                attachment.id;
          });
          frame.on("close", () => {
            if (parentDialog && !parentDialog.open) {
              parentDialog.showModal();
              requestAnimationFrame(() => button.focus());
            }
          });
          frame.open();
          return;
        }
        if (action === "import-prev" || action === "import-next") {
          const offset = Math.max(
            0,
            state.importPreview.offset +
              (action === "import-next" ? 100 : -100),
          );
          state.importPreview = await api(
            `content/import/${state.importPreview.token}?offset=${offset}`,
          );
          content();
          return;
        }
        if (action === "save-content-page") {
          const items = [
            ...document.querySelectorAll("[data-content-row]"),
          ].map((row) => {
            const value = (name) =>
                row.querySelector(`[name=${name}]`)?.value || "",
              date = value("publish_date"),
              time = value("publish_time");
            return {
              title: value("title"),
              description: value("description"),
              keywords: value("keywords")
                .split(/[,;|]/)
                .map((x) => x.trim())
                .filter(Boolean),
              category: value("category"),
              scheduledFor:
                date && time ? new Date(`${date}T${time}`).toISOString() : "",
              timezone: composerTimezone(),
              imageAttachmentId: Number(value("image_attachment_id")) || null,
              socialPost: Boolean(
                row.querySelector("[name=social_post]")?.checked,
              ),
            };
          });
          await api("content/tasks", { method: "POST", data: { items } });
          const nextOffset =
              state.importPreview.offset + state.importPreview.items.length,
            hasNext = nextOffset < state.importPreview.total;
          await loadContentData(true);
          state.importPreview = hasNext
            ? await api(
                `content/import/${state.importPreview.token}?offset=${nextOffset}`,
              )
            : null;
          content();
          return;
        }
        if (action === "delete-content") {
          if (
            !confirm(
              "Delete this Content task? A published WordPress article is never deleted by this action.",
            )
          )
            return;
          button.disabled = true;
          await api(`content/tasks/${button.dataset.id}/permanent`, {
            method: "DELETE",
          });
          state.contentSelection.delete(String(button.dataset.id));
          await loadContentData(true);
          content();
          return;
        }
        if (action === "create-social") {
          const draft = await api(`content/social/${button.dataset.postId}`, {
            method: "POST",
          });
          navigate("hub/create");
          setTimeout(() => {
            const form = document.getElementById("npati-composer");
            if (form) {
              form.elements.title.value = draft.title || "";
              form.elements.description.value = draft.text || "";
              form.elements.linkUrl.value = draft.url || "";
            }
          }, 0);
          return;
        }
      } catch (error) {
        alert(error.message || "Action failed");
        button.disabled = false;
      }
    },
    true,
  );
  window.addEventListener("popstate", () => {
    state.route = normalizeRoute(location.hash.replace(/^#/, "") || "market");
    render();
  });
  window.addEventListener("focus", () => {
    if (["hub/overview", "hub/calendar"].includes(state.route))
      refreshHubJobs().catch(() => {});
  });
  document.addEventListener("visibilitychange", () => {
    if (
      !document.hidden &&
      ["hub/overview", "hub/calendar"].includes(state.route)
    )
      refreshHubJobs().catch(() => {});
  });
  const submenuRoutes = {
    npati: "market",
    "npati-market": "market",
    "npati-hub-content": "hub/overview",
    "npati-content": "content",
    "npati-calendar": "hub/calendar",
    "npati-connections": "hub/connections",
  };
  document
    .querySelectorAll("#toplevel_page_npati .wp-submenu a")
    .forEach((link) => {
      const page = new URL(link.href, location.href).searchParams.get("page"),
        route = submenuRoutes[page];
      if (!route) return;
      link.href = `${cfg.adminBaseUrl || "admin.php?page=npati"}#${route}`;
      link.dataset.route = route;
    });
  hydrateWorkspaceCache();
  state.route = routeFromPage();
  navigate(state.route, true);
  loadData()
    .then(render)
    .catch((e) => (root.innerHTML = errorPanel(e)));
})();
