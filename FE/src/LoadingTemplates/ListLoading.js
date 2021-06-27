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
                <div className="loading">&nbsp;</div>
            </div>
            {getLoadingRows()}
        </div>
    );
}

export default ListLoading;