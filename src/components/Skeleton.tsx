import React from 'react';
import {
    Fade, Placeholder, PlaceholderLine, PlaceholderMedia
} from 'rn-placeholder';

const Skeleton = () => {
    return (
        <Placeholder
            Left={PlaceholderMedia}
            Animation={Fade}>
            <PlaceholderLine width={80} />
            <PlaceholderLine />
            <PlaceholderLine width={30} />
          </Placeholder>
    )
}

export default Skeleton
