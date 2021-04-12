console.log('AIOZ Cruiser extension loaded');
let timer = setTimeout(() => window.location.reload(), 30 * 1000);

const observer = new MutationObserver((mutationList) => {

	mutationList.forEach((mutation) => {

		mutation.addedNodes.forEach((addedNode) => {

			if (addedNode.className == 'video-box video-box-16-9 aioz-player') {
				console.log('placeholder appeared');
				timer = setTimeout(() => window.location.reload(), 30 * 1000);
			}

			if (addedNode.id == 'player_html5_api') {
				console.log('player has been added');
				let videoElement = document.querySelector('#player_html5_api');
				if (!videoElement) return;
				videoElement.onloadeddata = () => {
					console.log('video has been loaded');
					clearTimeout(timer);
					console.log('video duration -> ' + videoElement.duration);
					videoElement.currentTime = videoElement.duration - 2;
				};
			}

			if (addedNode.classList && addedNode.classList.contains('video-box--purchase')) {
				console.log('purchase popup shown');
				let divRelatedSidebar = document.querySelector('div.related-sidebar-videos');
				let divFirstVideo = divRelatedSidebar.children[0];
				let aFirstVideo = divFirstVideo.querySelector('a');
				window.location.href = aFirstVideo.href;
			}

		});
	});
});


observer.observe(document.querySelector('main.video-detail-page'), { subtree: true, childList: true });

