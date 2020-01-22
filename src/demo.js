document.addEventListener("DOMContentLoaded", () => {
	const menuData = {
		header: {
			theme: 'web',
			brand: {
				label: 'Esri Global',
				image: './img/gnav-esri-logo-globe-tm.svg',
				href: 'https://www.esri.com/',
				width: 80,
				height: 30,
				distributorImage: './img/dist-logo.jpg',
				distributorImageWidth: 120,
				distributorImageHeight: 56
			},
			cart: {
				items: 0,
				url: 'https://checkout.esri.com/'
			},
			menus: [
				[
					{
						label: 'Products',
						cols: [
							{
								type: 'single',
								border: 'true',
								items: [
									{
										heading: 'Capabilities',
										label: 'Mapping & Location Enablement',
										href: 'https://www.esri.com/en-us/location-intelligence'
									},
									{
										label: 'Field Operations',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview'
									},
									{
										label: 'Spatial Analysis & Data Science',
										href: 'https://www.esri.com/en-us/location-intelligence'
									},
									{
										label: 'Imagery & Remote Sensing',
										href: 'https://www.esri.com/en-us/location-intelligence'
									},
									{
										label: 'Real-Time Visualization & Analytics',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview'
									},
									{
										label: '3D Visualization & Analytics',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview'
									},
									{
										label: 'Data Management',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview'
									},
									{
										heading: 'EXPLORE MORE',
										label: 'All Products',
										href: 'https://www.esri.com/en-us/location-intelligence'
									},
									{
										label: 'About ArcGIS',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview'
									},
									{
										label: 'How to Buy',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview'
									}
								]
							},
							{
								type: 'structured',
								border: 'false',
								items: [
									{
										heading: 'Core Products',
										label: 'ArcGIS Online',
										href: 'https://www.esri.com/en-us/location-intelligence',
										description: 'Complete SaaS mapping platform'
									},
									{
										label: 'ArcGIS Pro',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview',
										description: 'Next generation desktop GIS'
									},
									{
										label: 'ArcGIS Enterprise',
										href: 'https://www.esri.com/en-us/location-intelligence',
										description: 'Flexible mapping server software'
									},
									{
										label: 'ArcGIS for Developers',
										href: 'https://www.esri.com/en-us/location-intelligence',
										description: 'Develop your own apps'
									},
									{
										label: 'Esri Data & Location Services',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview',
										description: 'Text needed for data and location services'
									}
								]
							},
							{
								type: 'structured',
								border: 'false',
								items: [
									{
										heading: 'Featured Products',
										label: 'ArcGIS Urban',
										href: 'https://www.esri.com/en-us/location-intelligence',
										description: 'Smart city planning for urban development'
									},
									{
										label: 'ArcGIS Business Analyst',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview',
										description: 'Business and market intelligence'
									},
									{
										label: 'ArcGIS Hub',
										href: 'https://www.esri.com/en-us/location-intelligence',
										description: 'Community engagement and collaboration'
									},
									{
										label: 'ArcGIS Excalibur',
										href: 'https://www.esri.com/en-us/location-intelligence',
										description: 'Imagery exploitation'
									},
									{
										label: 'ArcGIS Mission',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview',
										description: 'Mission management and situational awareness'
									}
								]
							}
						]
					},
					{
						label: 'Solutions',
						flyout: [
							{
								category: 'Business Needs',
								cols: [
									{
										col: [
											{
												heading: '',
												label: 'Asset Tracking and Analysis',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'Facility Management',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'Field Service Management',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'Logistics and Fulfillment',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'Market and Customer Analysis',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'Performance Monitoring',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									},
									{
										col: [
											{
												heading: 'Mapping The Nation',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									}
								]
							},
							{
								category: 'Geolocation',
								cols: [
									{
										col: [
											{
												heading: '',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & Mapping',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'Capabilities',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & Mapping',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'Capabilities',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & Mapping',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									},
									{
										col: [
											{
												heading: 'Mapping',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS Products',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									}
								]
							},
							{
								category: 'ArcGIS Enterprise',
								cols: [
									{
										col: [
											{
												heading: '',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & Mapping',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'Capabilities',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & Products',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'Additional Capabilities',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & Products',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									},
									{
										col: [
											{
												heading: 'Esri Mapping',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & Products',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									}
								]
							},
							{
								category: 'GIS & Mapping Products',
								cols: [
									{
										col: [
											{
												heading: 'Solutions',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & Products',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'Capabilities',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS Mapping',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'Capabilities',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS Mapping Software',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									}
								]
							},
							{
								category: 'Location-Enabled Products',
								cols: [
									{
										col: [
											{
												heading: 'Capabilities',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS Mapping Software',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'Capabilities',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS Mapping Software',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'Capabilities',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS Mapping Software',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									}
								]
							}
						]
					},
					{
						label: 'Support & Services',
						menus: [
							{
								label: 'Technical Support',
								href: 'https://support.esri.com/'
							},
							{
								label: 'Training',
								href: 'https://www.esri.com/training'
							},
							{
								label: 'Documentation',
								href: 'https://doc.arcgis.com/en'
							},
							{
								label: 'Consulting Services',
								href: 'https://www.esri.com/arcgis/services/consulting'
							},
							{
								label: 'Managed Cloud Services',
								href: 'https://www.esri.com/arcgis/services/managed-cloud'
							},
							{
								label: 'Esri Enterprise Advantage Program',
								href: 'https://www.esri.com/arcgis/services/eeap'
							},
							{
								label: 'Esri Community (GeoNet)',
								href: 'https://geonet.esri.com/'
							},
							{
								label: 'ArcGIS Blog',
								href: 'https://blogs.esri.com/esri/arcgis/'
							},
							{
								label: 'Contact Esri',
								href: 'https://www.esri.com/about-esri/contact'
							},
							{
								label: 'Contact Esri',
								href: 'https://www.esri.com/about-esri/contact'
							}
						]
					},
					{
						label: 'News',
						menus: [
							{
								label: 'Whats News',
								href: 'https://www.esri.com/about-esri'
							},
							{
								label: 'Good News',
								href: 'https://www.esri.com/about/newsroom/publications/wherenext/'
							},
							{
								label: 'Only Good News',
								href: 'https://www.esri.com/about/newsroom/publications/wherenext/'
							}
						]
					},
					{
						label: 'About',
						menus: [
							{
								label: 'About Esri',
								href: 'https://www.esri.com/about-esri'
							},
							{
								label: 'WhereNext Magazine',
								href: 'https://www.esri.com/about/newsroom/publications/wherenext/'
							},
							{
								label: 'Newsroom',
								href: 'https://www.esri.com/esri-news'
							},
							{
								label: 'Events',
								href: 'https://www.esri.com/events'
							},
							{
								label: 'Partners',
								href: 'https://www.esri.com/partners'
							},
							{
								label: 'Careers',
								href: 'https://www.esri.com/careers/main'
							},
							{
								label: 'Contact Esri',
								href: 'https://www.esri.com/about-esri/contact'
							}
						],
						tiles: [
							{
								label: 'Education',
								href: 'https://www.esri.com/industries/education',
								icon: [
									'M46.887 19.709L23.5 7.549.113 19.709 5.1 22.156V41h.8V22.549l3.2 1.57v9.627c0 2.207 7.748 5.874 14.247 8.563l.153.063.154-.062c6.498-2.69 14.246-6.357 14.246-8.564V24.12zM23.5 8.451l21.613 11.236L23.5 30.296 6.859 22.128l16.694-2.232-.106-.793-17.88 2.391-3.68-1.807zm13.6 25.295c0 1.27-5.458 4.383-13.6 7.76-8.142-3.378-13.6-6.491-13.6-7.76v-9.234l13.6 6.674 13.6-6.674z'
								]
							},
							{
								label: 'Sustainable Development',
								href: 'https://www.esri.com/industries/sustainable-development',
								icon: [
									'M41.242 38.49a13.374 13.374 0 0 0-4.405-19.792 13.276 13.276 0 0 0-3.37-10.155 13.421 13.421 0 0 0-12.939-4.112 13.24 13.24 0 0 0-4.617 2.03l-.003-.004c-.022.015-.042.033-.065.048-.039.028-.081.05-.12.078l.006.008a13.44 13.44 0 0 0-2.812 2.688 13.712 13.712 0 0 0-1.039 1.57l-.01-.005c-.056.096-.104.196-.157.294-.039.072-.086.14-.124.214l.009.004A13.407 13.407 0 0 0 10.1 17.5c0 .403.032.8.067 1.196a13.39 13.39 0 1 0 13.32 23.217 13.384 13.384 0 0 0 15.356-.927 13.494 13.494 0 0 0 1.92-1.91l.02.017c.1-.121.189-.25.285-.374.059-.076.13-.142.186-.219zm-2.897 1.871a12.587 12.587 0 0 1-14.112 1.064 13.38 13.38 0 0 0 1.639-20.503l-.56.572a12.603 12.603 0 1 1-15.037-1.944 13.354 13.354 0 0 0 13.247 11.346 14.064 14.064 0 0 0 3.169-.365l-.18-.779a12.708 12.708 0 0 1-10.847-2.384 12.581 12.581 0 0 1-3.172-15.983 12.828 12.828 0 0 1 1.057-1.616 12.648 12.648 0 0 1 2.757-2.612 12.456 12.456 0 0 1 4.4-1.946 12.627 12.627 0 0 1 12.166 3.867 12.47 12.47 0 0 1 3.185 9.243 13.368 13.368 0 0 0-18.317 8.075l.762.245a12.587 12.587 0 1 1 19.843 13.72z'
								]
							},
							{
								label: 'The Science of Where',
								href: 'https://www.esri.com/about-esri',
								icon: [
									'M8.9 8.9h8V4.1H4.1v12.8h4.8zm-.8 7.2H4.9V4.9h11.2v3.2h-8zm.8 4H4.1v23.8h26.8v-4.8h-22zm21.2 19.8v3.2H4.9V20.9h3.2v19zm-10-35.8v4.8h19v30.2h-5v4.8h9.8V4.1zm23 39h-8.2v-3.2h5V8.1h-19V4.9h22.2z'
								]
							}
						]
					}
				]
			],
			search: {
				label: 'Search',
				dialog: {
					action: 'https://pages.codehub.esri.com/marketing/esri-search-page/',
					label: 'Esri',
					'submitLabel': 'Search',
					'cancelLabel': 'Cancel',
					'queryLabel': 'Search Esri.com'
				}
			},
			notifications: {
				label: 'Notifications',
				dismissAllLabel: 'Dismiss all',
				dismissLabel: 'Dismiss notification',
				clearAllLabel: 'Mark all as read',
				emptyMessage: {
					image: {
						path: ['M15.5 1A14.5 14.5 0 1 0 30 15.5 14.5 14.5 0 0 0 15.5 1zm0 28.1a13.6 13.6 0 1 1 13.6-13.6 13.615 13.615 0 0 1-13.6 13.6zM8.581 17.276l.637-.636 3.288 3.098 10.073-9.92.637.637-10.71 10.556z'],
						viewBox: '0 0 32 32'
					},
					text: "You're up to date!"
				},
				messages: [
					{
						text: 'You accepted the invitation to join the <a href="#">Basemap Gallery</a>.',
						date: 'Yesterday',
						id: '131049582194'
					},
					{
						text: 'You were invited to join the <a href="#">Public Analysis group</a>.',
						date: '2 days ago',
						id: '131049582197'
					},
					{
						text: 'You accepted the invitation to join the <a href="#">Basemap Gallery</a>.',
						date: '3 days ago',
						id: '131049582194'
					},
					{
						text: 'You were invited to join the <a href="#">Public Analysis group</a>.',
						date: '3 days ago',
						id: '131049582197'
					},
					{
						text: 'You accepted the invitation to join the <a href="#">Basemap Gallery</a>.',
						date: '4 days ago',
						id: '131049582194'
					},
					{
						text: 'You were invited to join the <a href="#">Public Analysis group</a>.',
						date: '5 days ago',
						id: '131049582197'
					},
					{
						text: 'You accepted the invitation to join the <a href="#">Basemap Gallery</a>.',
						date: '5 days ago',
						id: '131049582194'
					},
					{
						text: 'You were invited to join the <a href="#">Public Analysis group</a>.',
						date: '1 week ago',
						id: '131049582197'
					},
					{
						text: 'You requested to join the <a href="#">Basemap Gallery</a> group.',
						date: '2 weeks ago',
						id: '131049582199'
					}
				]
			},
			apps: {
				label: 'Applications',
				disableDragAndDrop: false,
				displayIntro: true,
				ieVersion: null,
				text: {
					clear: "Clear",
					confirm: "Got it.",
					dragAppsHere: "Drag apps here that you don't use very often.",
					intro: "Drag and drop your favorite apps in any order to customize your app launcher",
					removed: "This app is no longer available.",
					removedMessage: "Removed app",
					showMore: "Show More"
				},
				primary: [
					{
						abbr: "APP",
						image: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/appstudio.png",
						label: "AppStudio for ArcGIS",
						url: "//appstudiodev.arcgis.com/apps.html",
						canAccess: true,
						itemId: "131049582192"
					},
					{
						abbr: "Studio",
						placeHolderIcon: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/svg-app-icon.svg",
						image: null,
						label: "Studio for ArcGIS",
						url: "//appstudiodev.arcgis.com/apps.html",
						canAccess: true,
						itemId: "131049582193"
					},
					{
						abbr: "Test",
						placeHolderIcon: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/svg-app-circle.svg",
						image: null,
						label: "Test App",
						url: "//appstudiodev.arcgis.com/apps.html",
						canAccess: true,
						isNew: true,
						itemId: "131049582194"
					}
				],
				secondary: [
					{
						abbr: "APP",
						image: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/appstudio.png",
						label: "AppStudio for ArcGIS",
						url: "//appstudiodev.arcgis.com/apps.html",
						canAccess: true,
						itemId: "131049582195"
					},
					{
						abbr: "Studio",
						placeHolderIcon: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/svg-app-icon.svg",
						image: null,
						label: "Studio for ArcGIS",
						url: "//appstudiodev.arcgis.com/apps.html",
						canAccess: false,
						itemId: "131049582196"
					}
				]
			},
			account: {
				label: 'Account Profile',
				controls: {
					signin: 'Sign In',
					signout: 'Sign Out',
					switch: 'Switch Account'
				},
				menus: [
					{
						label: 'Profile & Settings',
						href: '#user-menu-link-1'
					},
					{
						label: 'My Esri',
						href: '#user-menu-link-2'
					},
					{
						label: 'Training',
						href: '#user-menu-link-3'
					},
					{
						label: 'Community & Forums',
						href: '#user-menu-link-4'
					}
				],
				user: {
					name: 'Cesar Marrujo',
					id: 'iamoktatester@gmail.com',
					group: 'Riverside City Mgmt.',
					image: '//placehold.it/300x300'
				}
			}
		},
		footer: {
			hideMenus: false,
			label: 'Esri',
			brand: {
				label: 'Esri: The Science of Where',
				href: 'https://www.esri.com/about-esri',
				viewBox: '0 0 114 90',
				path: './img/gnav-tsow-frame.svg'
			},
			menu: {
				label: 'Esri Sites',
				menu: [
					{
						label: 'ArcGIS',
						menu: [
							{
								label: 'About ArcGIS',
								href: 'https://www.esri.com/arcgis/about-arcgis'
							},
							{
								label: 'ArcGIS Pro',
								href: 'https://www.esri.com/en/arcgis/products/arcgis-pro/Overview'
							},
							{
								label: 'ArcGIS Enterprise',
								href: 'https://www.esri.com/en/arcgis/products/arcgis-enterprise/Overview'
							},
							{
								label: 'ArcGIS Online',
								href: 'https://www.esri.com/software/arcgis/arcgisonline'
							},
							{
								label: 'Apps',
								href: 'https://www.esri.com/software/apps'
							},
							{
								label: 'ArcGIS for Developers',
								href: 'https://developers.arcgis.com/'
							}
						]
					},
					{
						label: 'Community',
						menu: [
							{
								label: 'Esri Community (GeoNet)',
								href: 'https://geonet.esri.com/'
							},
							{
								label: 'ArcGIS Blog',
								href: 'https://blogs.esri.com/esri/arcgis'
							},
							{
								label: 'Early Adopter Community',
								href: 'https://www.esri.com/early-adopter-community'
							},
							{
								label: 'Events',
								href: 'https://www.esri.com/events'
							}
						]
					},
					{
						label: 'Understanding GIS',
						menu: [
							{
								label: 'What is GIS?',
								href: 'https://www.esri.com/what-is-gis'
							},
							{
								label: 'Training',
								href: 'https://www.esri.com/training'
							},
							{
								label: 'Maps We Love',
								href: 'https://www.esri.com/products/maps-we-love'
							},
							{
								label: 'Blog',
								href: 'https://www.esri.com/about/newsroom/blog'
							},
							{
								label: 'WhereNext Magazine',
								href: 'https://www.esri.com/about/newsroom/publications/wherenext/'
							},
							{
								label: 'Learn ArcGIS',
								href: 'https://learn.arcgis.com/en/'
							}
						]
					},
					{
						label: 'Company',
						menu: [
							{
								label: 'About Esri',
								href: 'https://www.esri.com/about-esri'
							},
							{
								label: 'Contact Us',
								href: 'https://www.esri.com/about-esri/contact'
							},
							{
								label: 'Esri Offices Worldwide',
								href: 'https://www.esri.com/about-esri/contact#international'
							},
							{
								label: 'Careers',
								href: 'https://www.esri.com/careers'
							},
							{
								label: 'Open Vision',
								href: 'https://www.esri.com/software/open'
							},
							{
								label: 'Partners',
								href: 'https://www.esri.com/partners'
							}
						]
					},
					{
						label: 'Special programs',
						menu: [
							{
								label: 'Conservation',
								href: 'https://www.esri.com/esri-conservation-program'
							},
							{
								label: 'Disaster Response',
								href: 'https://www.esri.com/services/disaster-response'
							},
							{
								label: 'Education',
								href: 'https://www.esri.com/industries/education'
							},
							{
								label: 'Nonprofit',
								href: 'https://www.esri.com/nonprofit'
							},
							{
								label: 'US Navy SeaPort-e Information',
								href: 'https://www.esri.com/landing-pages/seaport'
							}
						]
					}
				]
			},
			social: {
				label: 'Social Media',
				menu: [
					{
						label: 'Facebook',
						href: 'https://www.facebook.com/esrigis',
						image: {
							viewBox: '0 0 38 38',
							path: ['M38 38V0H0v38h17.2V21.9H14v-5.7h3.2v-3.7c0-2.6 1.2-6.7 6.7-6.7h4.9v5.5h-3.6c-.6 0-1.4.3-1.4 1.5v3.3h5.1l-.6 5.7h-4.5v16.1H38z']
						}
					},
					{
						label: 'Twitter',
						href: 'https://twitter.com/Esri',
						image: {
							viewBox: '0 0 512 512',
							path: ['M512.002 97.211c-18.84 8.354-39.082 14.001-60.33 16.54 21.686-13 38.342-33.585 46.186-58.115a210.29 210.29 0 0 1-66.705 25.49c-19.16-20.415-46.461-33.17-76.674-33.17-58.011 0-105.042 47.029-105.042 105.039 0 8.233.929 16.25 2.72 23.939-87.3-4.382-164.701-46.2-216.509-109.753-9.042 15.514-14.223 33.558-14.223 52.809 0 36.444 18.544 68.596 46.73 87.433a104.614 104.614 0 0 1-47.577-13.139c-.01.438-.01.878-.01 1.321 0 50.894 36.209 93.348 84.261 103a105.245 105.245 0 0 1-27.674 3.687c-6.769 0-13.349-.66-19.764-1.888 13.368 41.73 52.16 72.104 98.126 72.949-35.95 28.176-81.243 44.967-130.458 44.967-8.479 0-16.84-.496-25.058-1.471 46.486 29.807 101.701 47.197 161.021 47.197 193.211 0 298.868-160.062 298.868-298.872 0-4.554-.104-9.084-.305-13.59 20.526-14.809 38.335-33.309 52.417-54.373z']
						}
					},
					{
						label: 'LinkedIn',
						href: 'https://www.linkedin.com/company/esri',
						image: {
							viewBox: '0 0 24 24',
							path: ['M0 0v24h24V0zm8 19H5V8h3zM6.5 6.7A1.8 1.8 0 1 1 8.3 5a1.8 1.8 0 0 1-1.8 1.7zM20 19h-3v-5.6c0-3.4-4-3.1-4 0V19h-3V8h3v1.8c1.4-2.6 7-2.8 7 2.5z']
						}
					},
					{
						label: 'Instagram',
						href: 'https://www.instagram.com/esrigram/',
						image: {
							viewBox: '0 0 30 30',
							path: ['M29.91 8.815c-.073-1.596-.327-2.686-.697-3.64a7.354 7.354 0 0 0-1.73-2.657 7.352 7.352 0 0 0-2.657-1.73C23.87.416 22.78.162 21.184.09 19.584.017 19.074 0 15 0s-4.585.017-6.184.09C7.219.163 6.129.417 5.174.787a7.352 7.352 0 0 0-2.656 1.73 7.354 7.354 0 0 0-1.73 2.657C.416 6.13.162 7.22.09 8.815.017 10.415 0 10.926 0 15s.017 4.585.09 6.184c.073 1.597.327 2.687.697 3.642a7.353 7.353 0 0 0 1.73 2.656 7.353 7.353 0 0 0 2.657 1.73c.955.371 2.045.625 3.642.698 1.6.073 2.11.09 6.184.09s4.585-.017 6.184-.09c1.597-.073 2.687-.327 3.642-.697a7.353 7.353 0 0 0 2.656-1.73 7.353 7.353 0 0 0 1.73-2.657c.371-.955.625-2.045.698-3.642.073-1.6.09-2.11.09-6.184s-.017-4.585-.09-6.185zm-2.997 12.232c-.064 1.412-.287 2.153-.496 2.691a4.376 4.376 0 0 1-1.056 1.623 4.371 4.371 0 0 1-1.622 1.055c-.539.21-1.28.433-2.691.497-1.573.072-2.045.087-6.048.087s-4.475-.015-6.047-.087c-1.412-.064-2.153-.287-2.691-.496a4.376 4.376 0 0 1-1.623-1.056 4.371 4.371 0 0 1-1.055-1.622c-.21-.539-.433-1.28-.497-2.691C3.015 19.475 3 19.003 3 15s.015-4.475.087-6.047c.064-1.412.287-2.153.496-2.691a4.38 4.38 0 0 1 1.056-1.623A4.371 4.371 0 0 1 6.26 3.584c.539-.21 1.28-.433 2.691-.497C10.525 3.015 10.997 3 15 3s4.475.015 6.047.087c1.412.064 2.153.287 2.691.496a4.38 4.38 0 0 1 1.623 1.056c.493.493.8.963 1.055 1.622.21.539.433 1.28.497 2.691.072 1.573.087 2.045.087 6.048s-.015 4.475-.087 6.047zM15 7.175a7.825 7.825 0 1 0 0 15.65 7.825 7.825 0 0 0 0-15.65zm0 12.65c-2.66 0-4.825-2.164-4.825-4.825s2.164-4.825 4.825-4.825 4.825 2.164 4.825 4.825-2.164 4.825-4.825 4.825zm6.007-12.832a2 2 0 1 0 4 0 2 2 0 1 0-4 0']
						}
					},
					{
						label: 'YouTube',
						href: 'https://www.youtube.com/user/esritv',
						image: {
							viewBox: '0 0 310 310',
							path: ['M297.917 64.645c-11.19-13.302-31.85-18.728-71.306-18.728H83.386c-40.359 0-61.369 5.776-72.517 19.938C0 79.663 0 100.008 0 128.166v53.669c0 54.551 12.896 82.248 83.386 82.248h143.226c34.216 0 53.176-4.788 65.442-16.527C304.633 235.518 310 215.863 310 181.835v-53.669c0-29.695-.841-50.16-12.083-63.521zm-98.896 97.765l-65.038 33.991a9.997 9.997 0 0 1-14.632-8.863v-67.764a10 10 0 0 1 14.609-8.874l65.038 33.772a10 10 0 0 1 .023 17.738z']
						}
					},
					{
						label: 'GeoNet',
						href: 'https://geonet.esri.com/',
						image: {
							viewBox: '7 7 16 16',
							path: ['M23 19h-3v4l-4-4H7V9h16z']
						}
					},
					{
						label: 'Google Plus',
						href: 'https://plus.google.com/discover',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/GooglePlus_32.svg'
						}
					},
					{
						label: 'Arc Germany',
						href: 'http://en.arcgermany.com/en/',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/ArcGermany_32.svg'
						}
					},
					{
						label: 'Blogger',
						href: 'https://www.blogger.com',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/Blogger_32.svg'
						}
					},
					{
						label: 'Email',
						href: 'mailto:info@esri.com',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/Contact-Newsletter_32.svg'
						}
					},
					{
						label: 'GisIQ',
						href: 'https://gis-iq.esri.de/',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/GISIQ_32.svg'
						}
					},
					{
						label: 'Pintrest',
						href: 'https://www.pinterest.com/',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/Pinterest_32.svg'
						}
					},
					{
						label: 'Rss',
						href: 'https://en.wikipedia.org/wiki/RSS',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/RSSFeed_32.svg'
						}
					},
					{
						label: 'Tumblr',
						href: 'https://en.wikipedia.org/wiki/RSS',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/Tumblr_32.svg'
						}
					},
					{
						label: 'Xing',
						href: 'https://www.xing.com/en',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/Xing_32.svg'
						}
					}
				]
			},
			info: {
				label: 'Additional Links',
				menu: [
					{
						label: 'Privacy',
						href: 'https://www.esri.com/legal/privacy'
					},
					{
						label: 'Legal',
						href: 'https://www.esri.com/legal'
					},
					{
						label: 'Site Map',
						href: 'http://www.esri.com/site-map'
					},
					{
						label: 'Terms and Conditions',
						href: 'https://www.esri.com/legal/software-license'
					},
					{
						label: 'Code of Business Conduct',
						href: 'https://www.esri.com/about-esri/code-of-conduct'
					}
				]
			},
			language: {
				label: 'Switch Languages',
				buttonLabel: 'United States (English)',
				submitLabel: 'Change',
				greetingLabel: 'Hello!',
				messageLabel: 'You are seeing the English page. Is this correct?',
				closeLabel: 'Close Navigation',
				optionsLabel: 'Desired Language',
				options: [
					{
						label: 'English',
						value: '#the-english-page'
					},
					{
						label: 'French',
						value: '#the-french-page'
					}, {
						label: 'Spanish',
						value: '#the-spanish-page'
					}
				]
			}
		}
	};

	esriGlobalNav.create({headerElm: '.esri-header-barrier', footerElm: '.esri-footer-barrier', menuData});
});
