<?php
namespace NPATI\Hub\Core;

use NPATI\Hub\Auth\ConnectionService;

defined( 'ABSPATH' ) || exit;

final class I18n {
	private $settings;
	private $connection;
	private $language;

	public function __construct( Settings $settings, ConnectionService $connection ) {
		$this->settings   = $settings;
		$this->connection = $connection;
	}

	public function register() {
		add_filter( 'gettext', array( $this, 'translate' ), 10, 3 );
	}

	public function language() {
		if ( null !== $this->language ) {
			return $this->language;
		}
		$status = $this->connection->status();
		if ( ! empty( $status['connected'] ) ) {
			$this->language = 'UA' === strtoupper( (string) $status['market'] ) ? 'uk' : 'en';
			return $this->language;
		}
		$locale         = function_exists( 'determine_locale' ) ? determine_locale() : get_locale();
		$this->language = 0 === strpos( strtolower( (string) $locale ), 'uk' ) ? 'uk' : 'en';
		return $this->language;
	}

	public function translate( $translated, $original, $domain ) {
		if ( 'npati-content-automation' !== $domain || 'uk' !== $this->language() ) {
			return $translated;
		}
		$copy = array(
			'Dashboard'                                  => 'Панель керування',
			'Market'                                     => 'Маркет',
			'NPATI Market'                               => 'NPATI Маркет',
			'Content'                                    => 'Контент',
			'Calendar'                                   => 'Календар',
			'Analytics'                                  => 'Аналітика',
			'Connections'                                => 'Підключення',
			'Security'                                   => 'Безпека',
			'Settings'                                   => 'Налаштування',
			'WordPress workspace'                        => 'Робочий простір WordPress',
			'Connected'                                  => 'Підключено',
			'Offline'                                    => 'Не підключено',
			'Create post'                                => 'Створити публікацію',
			'One workspace for your store, content and publishing.' => 'Єдиний простір для магазину, контенту та публікацій.',
			'Connect your NPATI account or create a new one without leaving WordPress. Social credentials are never stored by WordPress.' => 'Підключіть обліковий запис NPATI або створіть новий у WordPress. Дані соціальних мереж ніколи не зберігаються у WordPress.',
			'Connect NPATI'                              => 'Підключити NPATI',
			'Create account'                             => 'Створити обліковий запис',
			'Create NPATI account'                       => 'Створення облікового запису NPATI',
			'Nickname'                                   => 'Нікнейм',
			'Password'                                   => 'Пароль',
			'The password is sent directly to NPATI Hub and is not stored by WordPress.' => 'Пароль надсилається безпосередньо до NPATI Hub і не зберігається у WordPress.',
			'NPATI connected successfully.'              => 'NPATI успішно підключено.',
			'The NPATI pairing request expired. Start again.' => 'Запит на підключення NPATI завершився. Почніть знову.',
			'NPATI returned incomplete connection data.' => 'NPATI повернув неповні дані підключення.',
			'Good to see you'                            => 'Раді вас бачити',
			'Manage your NPATI market presence and publishing workflow from WordPress.' => 'Керуйте маркетом NPATI і публікаціями безпосередньо з WordPress.',
			'Create Hub post'                            => 'Створити публікацію Hub',
			'NPATI account'                              => 'Обліковий запис NPATI',
			'WordPress site'                             => 'Сайт WordPress',
			'High Security'                              => 'Посилений захист',
			'Standard'                                   => 'Стандартний',
			'Keep your workflow moving'                  => 'Швидкі дії',
			'Manage listings'                            => 'Керувати оголошеннями',
			'Open Hub'                                   => 'Відкрити Hub',
			'Content calendar'                           => 'Календар контенту',
			'View analytics'                             => 'Переглянути аналітику',
			'Overview'                                   => 'Огляд',
			'Create Post'                                => 'Створити публікацію',
			'History'                                    => 'Історія',
			'Publishing workspace'                       => 'Робочий простір публікацій',
			'New publication'                            => 'Нова публікація',
			'Security status'                            => 'Стан безпеки',
			'Connection'                                 => 'Підключення',
			'Webhook signature'                          => 'Підпис webhook',
			'Social tokens in WordPress'                 => 'Токени соціальних мереж у WordPress',
			'Never'                                      => 'Ніколи',
			'Recent activity'                            => 'Остання активність',
			'NPATI market'                               => 'Ринок NPATI',
			'The market is set automatically from the country in your NPATI profile and cannot be changed in WordPress.' => 'Ринок визначається автоматично за країною у профілі NPATI та не може бути змінений у WordPress.',
			'Default WordPress author'                   => 'Автор WordPress за замовчуванням',
			'Use site administrator'                     => 'Використовувати адміністратора сайту',
			'Store link'                                 => 'Посилання на магазин',
			'Show in the footer (explicit opt-in)'       => 'Показувати у підвалі сайту',
			'Security mode'                              => 'Режим безпеки',
			'Allow signed commands to publish (otherwise drafts only)' => 'Дозволити підписаним командам публікувати записи',
			'Audit retention'                            => 'Зберігання журналу',
			'Uninstall'                                  => 'Видалення',
			'Delete plugin settings and local integration tables on uninstall' => 'Видалити налаштування та локальні таблиці під час деінсталяції',
			'Save Settings'                              => 'Зберегти налаштування',
			'Settings saved.'                            => 'Налаштування збережено.',
			'Select a media file you can access.'        => 'Виберіть медіафайл, до якого маєте доступ.',
			'Choose a supported image or video.'         => 'Виберіть підтримуване зображення або відео.',
			'The selected file is too large.'            => 'Вибраний файл завеликий.',
			'Listings support JPG, PNG, WebP, MP4, MOV and WebM.' => 'Оголошення підтримують JPG, PNG, WebP, MP4, MOV та WebM.',
			'Post title and content are required.'       => 'Заголовок і вміст публікації є обов’язковими.',
		);
		$copy = array_merge(
			$copy,
			array(
				'Control how NPATI works with this WordPress website.' => 'Керуйте роботою NPATI на цьому сайті WordPress.',
				'Account and website'                     => 'Обліковий запис і сайт',
				'Profile and site presentation settings.' => 'Налаштування профілю та відображення на сайті.',
				'Choose the author used for content created through NPATI.' => 'Оберіть автора для контенту, створеного через NPATI.',
				'Display a link to your NPATI store in the website footer.' => 'Показуйте посилання на магазин NPATI у підвалі сайту.',
				'Publishing and security'                 => 'Публікація та безпека',
				'Permissions, protection and local data retention.' => 'Дозволи, захист і зберігання локальних даних.',
				'Select the protection level for requests from NPATI Hub.' => 'Оберіть рівень захисту для запитів із NPATI Hub.',
				'Control whether signed Hub commands can publish immediately.' => 'Визначте, чи можуть підписані команди Hub публікувати одразу.',
				'Choose how long local security activity is retained.' => 'Оберіть термін зберігання локального журналу безпеки.',
				'%d days'                                 => '%d днів',
				'This option permanently removes local NPATI data when the plugin is deleted.' => 'Ця опція назавжди видалить локальні дані NPATI під час видалення плагіна.',
				'Changes apply to this WordPress website only.' => 'Зміни застосовуються лише до цього сайту WordPress.',
				'Open profile menu'                       => 'Відкрити меню профілю',
				'NPATI profile'                           => 'Профіль NPATI',
				'Change profile photo'                    => 'Змінити фото профілю',
				'View NPATI profile'                      => 'Переглянути профіль NPATI',
				'Select an image you can access.'         => 'Виберіть зображення, до якого маєте доступ.',
				'Choose a JPG, PNG, WebP or GIF image.'   => 'Виберіть зображення JPG, PNG, WebP або GIF.',
				'The profile photo must be 5 MB or smaller.' => 'Фото профілю має бути розміром не більше 5 МБ.',
				'Sign out'                                => 'Вийти',
			)
		);
		return isset( $copy[ $original ] ) ? $copy[ $original ] : $translated;
	}
}
