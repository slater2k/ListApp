/**
 * Right, this is what the pros do.. fudge some sort of blank "loading" style template ready for the content to come in
 * Unsure this is the most maintainable way, if we changed the design of list.js
 * @see useFetch - added 2s delay to mimic loading because strapi is fast as FFFFF
 * @returns {JSX.Element}
 * @constructor
 */
const ListLoading = () => {

    const loadingRowCount = 15;
    const getLoadingRows = () => {
        let content = [];

        for (let i = 0; i < loadingRowCount; i++) {
            let randomUsername = Math.random().toString(36).substring(7);
            content.push(
                <div className="list-group-item loading-blur">
                    <div className="row">
                        <div className="col">
                            <strong className="mr-4">#{i}</strong>
                            <span>{randomUsername}</span>
                        </div>
                    </div>
                </div>
            );
        }
        return content;
    }

    return (
        <div className="list-loading">
            <div className="loading-wrapper">
                <svg className="loading-svg" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" r="0" fill="none" stroke="#0055a5" stroke-width="2">
                        <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
                        <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
                    </circle>
                    <circle cx="50" cy="50" r="0" fill="none" stroke="#45aee7" stroke-width="2">
                        <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s"></animate>
                        <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s"></animate>
                    </circle>
                </svg>
            </div>
            {getLoadingRows()}
        </div>
    );
}

export default ListLoading;